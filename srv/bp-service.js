const cds = require('@sap/cds');
cds.env.features.fetch_csrf = true;

module.exports = cds.service.impl(async function() {
	const { BusinessPartner, BusinessPartnerAddress } = this.entities;
    const service = await cds.connect.to('OP_API_BUSINESS_PARTNER_SRV');
    
	this.on('READ', BusinessPartner, request => {
		console.log("READ called on BusinessPartner: [" + request.query + "]");
		return service.tx(request).run(request.query);
	});

	this.on('CREATE', BusinessPartnerAddress, request => {
		console.log("CREATE called on BusinessPartnerAddress: [" + request.query + "]");
		return service.tx(request).run(request.query);
	});
	this.on('READ', BusinessPartnerAddress, request => {
		console.log("READ called on BusinessPartnerAddress");
		return service.tx(request).run(request.query);
	});
	this.on('UPDATE', BusinessPartnerAddress, request => {
		console.log("UPDATE called on BusinessPartnerAddress: [" + request.query + "]");
		return service.tx(request).run(request.query);
	});
	this.on('DELETE', BusinessPartnerAddress, request => {
		console.log("DELETE called on BusinessPartnerAddress: [" + request.query + "]");
		return service.tx(request).run(request.query);
	});
});