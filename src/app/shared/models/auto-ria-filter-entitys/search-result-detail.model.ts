export class SearchResultDetail {

  EUR: number;
  UAH: number;
  USD: number;
  VIN: string;
  addDate: Date;
  auctionPossible: boolean;
  autoData: {
    active: boolean;
    autoId: number;
    bodyId: number;
    categoryId: number;
    categoryNameEng: string;
    custom: number;
    description: string;
    driveId: number;
    driveName: string;
    fromArchive: boolean;
    fuelId: number;
    fuelName: string;
    fuelNameEng: string;
    gearBoxId: number;
    gearboxName: string;
    isSold: boolean;
    mainCurrency: string;
    onModeration: boolean;
    race: string;
    raceInt: number;
    statusId: number;
    subCategoryNameEng: string;
    version: string;
    withVideo: boolean;
    withVideoMessages: boolean;
    year: number;
  };
  autoInfoBar: {
    abroad: boolean;
    confiscatedCar: boolean;
    custom: boolean;
    damage: boolean;
    onRepairParts: boolean;
    underCredit: boolean;
  };
  badges: [];
  canSetSpecificPhoneToAdvert: boolean;
  checkedVin: {
    orderId: number;
    vin: string;
    isShow: false
  };
  chipsCount: number;
  cityLocative: string;
  dealer: {
    id: number;
    link: string;
    logo: string;
    name: string;
    packageId: number;
    type: string;
    typeId: number
  };
  dontComment: number;
  exchangePossible: boolean;
  exchangeType: string;
  exchangeTypeId: number;
  expireDate: Date;
  hasWebP: number;
  haveInfotechReport: boolean;
  infoBarText: string;
  isAutoAddedByPartner: boolean;
  isLeasing: number;
  levelData: {
    level: number;
    label: number;
    period: number;
    hotType: string;
    expireDate: boolean;
  };
  linkToView: string;
  locationCityName: string;
  markId: number;
  markName: string;
  markNameEng: string;
  modelId: number;
  modelName: string;
  modelNameEng: string;
  moderatedAbroad: boolean;
  oldTop: {
    isActive: boolean;
    expireDate: string;
  };
  optionStyles: [];
  partnerId: number;
  photoData: {
    count: 23
    seoLinkB: string;
    seoLinkF: string;
    seoLinkM: string;
    seoLinkSX: string;
  };
  realtyExchange: boolean;
  secureKey: string;
  sendComments: number;
  soldDate: string;
  stateData: {
    cityId: number;
    linkToCatalog: string;
    name: string;
    regionName: string;
    regionNameEng: string;
    stateId: number;
    title: string;
  };
  title: string;
  updateDate: Date;
  userBlocked: [];
  userHideADSStatus: boolean;
  userId: number;
  userPhoneData: {
    phone: string;
    phoneId: string;
  };
  withInfoBar: boolean;

}

