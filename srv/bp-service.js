const cds = require('@sap/cds');
cds.env.features.fetch_csrf = true;

module.exports = cds.service.impl(async function() {
	const { BusinessPartner, BusinessPartnerAddress } = this.entities;
  const service = await cds.connect.to('OP_API_BUSINESS_PARTNER_SRV');
  const messaging = await cds.connect.to('messaging')
  const log = cds.log("bpprovider-service");
    
	this.on('READ', BusinessPartner, request => {
		log.info("READ called on BusinessPartner: [" + request.query + "]");
		return service.tx(request).run(request.query);
	});
	this.on('READ', BusinessPartnerAddress, request => {
		log.info("READ called on BusinessPartnerAddress");
		return service.tx(request).run(request.query);
	});


  messaging.on(["S4H/BO/BusinessPartner/Created", "ce/sap/s4/beh/businesspartner/v1/BusinessPartner/Created/v1"], async msg => {
    
    log.info("<< Create event caught", msg.data);
    let BUSINESSPARTNER = "";
    if(msg.headers && msg.headers.specversion == "1.0"){
       //> Fix for 2020 on-premise
      BUSINESSPARTNER = (+(msg.data.BusinessPartner)).toString();
    }
    else{
      BUSINESSPARTNER = (+(msg.data.KEY[0].BUSINESSPARTNER)).toString();
    }
      
    // ID has prefix 000 needs to be removed to read address
    log.info(BUSINESSPARTNER);
    const bpEntity = await bupaSrv.run(SELECT.one(BusinessPartner).where({businessPartnerId: BUSINESSPARTNER}));
    if(!bpEntity){
      log.info(`BP doesn't exist in the given destination`);
      return;
    }
    const result = await cds.run(INSERT.into(Notifications).entries({businessPartnerId:BUSINESSPARTNER, verificationStatus_code:'N', businessPartnerName:bpEntity.businessPartnerName}));
    const address = await bupaSrv.run(SELECT.one(BusinessPartnerAddress).where({businessPartnerId: BUSINESSPARTNER}));
    // for the address to notification association - extra field
    if(address){
      const notificationObj = await cds.run(SELECT.one(Notifications).columns("ID").where({businessPartnerId: BUSINESSPARTNER}));
      address.notifications_ID=notificationObj.ID;
      const res = await cds.run(INSERT.into(Addresses).entries(address));
      log.info("Address inserted");
    }
  });

  messaging.on(["S4H/BO/BusinessPartner/Changed", "ce/sap/s4/beh/businesspartner/v1/BusinessPartner/Changed/v1"], async msg => {
    log.info(`<< Change event caught: ${JSON.stringify(msg.data)}`);
    let BUSINESSPARTNER=""
    if(msg.headers && msg.headers.specversion == "1.0"){
       //> Fix for 2020 on-premise
        BUSINESSPARTNER = (+(msg.data.BusinessPartner)).toString();
    }
    else{
       BUSINESSPARTNER = (+(msg.data.KEY[0].BUSINESSPARTNER)).toString();
    }
    const bpIsAlive = await cds.run(SELECT.one(Notifications, (n) => n.verificationStatus_code).where({businessPartnerId: BUSINESSPARTNER}));
    if(bpIsAlive && bpIsAlive.verificationStatus_code == "V"){
      const bpMarkVerified= await cds.run(UPDATE(Notifications).where({businessPartnerId: BUSINESSPARTNER}).set({verificationStatus_code:"C"}));
      log.info("<< BP marked verified >> ", bpMarkVerified);
    }    
    
  });

});