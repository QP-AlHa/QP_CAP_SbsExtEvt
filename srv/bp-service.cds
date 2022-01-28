using OP_API_BUSINESS_PARTNER_SRV as BUPA_API from './external/OP_API_BUSINESS_PARTNER_SRV';
namespace service.bpProvider;
 
 
service BPService  {
  @requires: 'authenticated-user'
  @readonly entity BusinessPartner as projection on BUPA_API.A_BusinessPartner {
     key BusinessPartner as businessPartnerId,
      BusinessPartnerFullName as businessPartnerName,
      to_BusinessPartnerAddress as to_BusinessPartnerAddress
  };

  @requires: 'authenticated-user'
  @Capabilities: {
    InsertRestrictions.Insertable: false,
    UpdateRestrictions.Updatable: true,
    DeleteRestrictions.Deletable: false,
    ReadRestrictions.Readable: true
  }
  entity BusinessPartnerAddress as projection on BUPA_API.A_BusinessPartnerAddress {
     key BusinessPartner as businessPartnerId,
     key AddressID as addressId,
      Country as country,
      CityName as cityName ,
      StreetName as streetName,
      HouseNumber as houseNumber,
      PostalCode as postalCode,
      Language as corrLanguage,
      ValidityStartDate as validFrom,
      ValidityEndDate as validTo
  };

}