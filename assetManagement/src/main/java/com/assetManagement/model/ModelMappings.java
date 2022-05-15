package com.assetManagement.model;

public class ModelMappings {

	public final static String DATE_FORMAT = "yyMMdd";
	public final static String TRUE = "true";
	public final static String FALSE = "false";
	public final static Integer COMPANY_ID = 1;
	public final static String YES = "Y";
	public final static String NO = "N";
	
	//Client
	public final static String CLIENT_id = "#id";
	public final static String CLIENT_cName = "#cName";
	public final static String CLIENT_cSurname = "#cSurname";
	public final static String CLIENT_cEmail = "#cEmail";
	public final static String CLIENT_cTelH = "#cTelH";
	public final static String CLIENT_cTelW = "#cTelW";
	public final static String CLIENT_cTelCell = "#cTelCell";
	public final static String CLIENT_refId = "#refId";
	
	//Supplier
	public final static String SUPPLIER_supplierId = "#id";
	public final static String SUPPLIER_contactPerson = "#contactPerson";
	public final static String SUPPLIER_supplierTel = "#supplierTel";
	public final static String SUPPLIER_supplierEmail = "#supplierEmail";
	public final static String SUPPLIER_bank = "#bank";
	public final static String SUPPLIER_bankCode = "#bankCode";
	public final static String SUPPLIER_supplierBankNum = "#supplierBankNum";
	public final static String SUPPLIER_supplierTypeBankAccount = "#supplierTypeBankAccount";
	
	//Supplement
	public final static String SUPPLEMENT_supplementId = "#id";
	public final static String SUPPLEMENT_supplierId = "#supplierId";
	public final static String SUPPLEMENT_supplementDescription = "#supplementDescription";
	public final static String SUPPLEMENT_costExcl = "#costExcl";
	public final static String SUPPLEMENT_costIncl = "#costIncl";
	public final static String SUPPLEMENT_minLevels = "#minLevels";
	public final static String SUPPLEMENT_currentStockLevels = "#currentStockLevels";
	public final static String SUPPLEMENT_nappiCode = "#nappiCode";
	
	//SysParameters
	public final static String SETTINGS_id = "#id";
	public final static String SETTINGS_vatPercent = "#vatPercent";
	
}
