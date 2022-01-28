using service.bpProvider.BPService as service from '../../srv/bp-service';

annotate service.BusinessPartner with @UI.LineItem : [
{
    $Type : 'UI.DataField',
    Value : businessPartnerId
},
{
    $Type : 'UI.DataField',
    Value : businessPartnerName
}
];

annotate service.BusinessPartner with {
    businessPartnerName @title: 'Name';
    businessPartnerId @title: 'Number';
}

annotate service.BusinessPartner with @UI.HeaderInfo :
{
    TypeName : 'Business Partner',
    TypeNamePlural : 'Business Partners',
    Title: { $Type: 'UI.DataField', Value: businessPartnerName },
    Description: { $Type: 'UI.DataField', Value: businessPartnerId },
};

annotate service.BusinessPartnerAddress with @UI.LineItem : [
{
    $Type : 'UI.DataField',
    Value : businessPartnerId
},
{
    $Type : 'UI.DataField',
    Value : addressId
},
{
    $Type : 'UI.DataField',
    Value : postalCode
},
{
    $Type : 'UI.DataField',
    Value : cityName
},
{
    $Type : 'UI.DataField',
    Value : streetName
},
{
    $Type : 'UI.DataField',
    Value : houseNumber
},
{
    $Type : 'UI.DataField',
    Value : country
},
{
    $Type : 'UI.DataField',
    Value : corrLanguage
},
{
    $Type : 'UI.DataField',
    Value : validFrom
},
{
    $Type : 'UI.DataField',
    Value : validTo
}
];

annotate service.BusinessPartnerAddress with {
    businessPartnerId @title: 'BP Number' @readonly;
    addressId @title: 'Addr Number' @readonly;
    postalCode @title: 'ZIP';
    cityName @title: 'City';
    streetName @title: 'Street';
    houseNumber @title: 'House Number';
    country @title: 'Country';
    corrLanguage @title: 'Language';
    validFrom @title: 'Valid From' @readonly;
    validTo @title: 'Valid To' @readonly;
}

annotate service.BusinessPartnerAddress with @UI.HeaderInfo :
{
    TypeName : 'Business Partner Address',
    TypeNamePlural : 'Business Partner Addresses',
    Title: { $Type: 'UI.DataField', Value: cityName },
    Description: { $Type: 'UI.DataField', Value: businessPartnerId },
};

annotate service.BusinessPartner with @UI.Facets : [{
    $Type : 'UI.ReferenceFacet',
    Label : 'Adresses',
    Target : 'to_BusinessPartnerAddress/@UI.LineItem'
}];

annotate service.BusinessPartnerAddress with @UI.FieldGroup : {
    Data : [
        { $Type: 'UI.DataField', Value: postalCode },
        { $Type: 'UI.DataField', Value: cityName },
        { $Type: 'UI.DataField', Value: streetName },
        { $Type: 'UI.DataField', Value: houseNumber },
        { $Type: 'UI.DataField', Value: country },
        { $Type: 'UI.DataField', Value: corrLanguage },
        { $Type: 'UI.DataField', Value: validFrom },
        { $Type: 'UI.DataField', Value: validTo }
    ]
};

annotate service.BusinessPartnerAddress with @UI.Facets : [{
    $Type : 'UI.ReferenceFacet',
    Label : 'Address Information',
    Target : '@UI.FieldGroup'
}];


