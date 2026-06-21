-- MySQL dump 10.13  Distrib 9.5.0, for macos15.4 (arm64)
--
-- Host: localhost    Database: muscleyn
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'ef9d5c26-b81d-11f0-9337-4d66194b2cfc:1-3134';

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address_type` enum('HOME','OFFICE','OTHER') DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `house_no` varchar(255) DEFAULT NULL,
  `is_default` bit(1) DEFAULT NULL,
  `landmark` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banner`
--

DROP TABLE IF EXISTS `banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banner` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `image_url` longtext,
  `is_active` bit(1) DEFAULT NULL,
  `redirect_url` varchar(255) DEFAULT NULL,
  `sort_order` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `eyebrow` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banner`
--

LOCK TABLES `banner` WRITE;
/*!40000 ALTER TABLE `banner` DISABLE KEYS */;
INSERT INTO `banner` VALUES (1,'2026-06-20 15:44:55.872095','/uploads/products/827e03a1-6044-4cc7-9064-19d6b79b7884_download.jpeg',_binary '','/product/4',2,'Summer Sale','2026-06-20 17:01:43.422405',NULL,NULL),(2,'2026-06-20 16:06:37.750439','/uploads/products/966f2cdc-f584-4c71-9187-2dbe4f1d3e65_images.jpeg',_binary '','/product/6',1,'Summer Sale 12','2026-06-20 17:00:39.656833',NULL,NULL);
/*!40000 ALTER TABLE `banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKrdxh7tq2xs66r485cc8dkxt77` (`name`),
  UNIQUE KEY `UKom0cu04q91f26vokh7kpyv4of` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (2,'2026-05-31 22:45:01.524261',_binary '','https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop','Muscleyn Lab','muscleyn-lab','2026-06-14 17:51:05.212542'),(3,'2026-05-31 22:45:01.524261',_binary '','https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=600&auto=format&fit=crop','Muscleyn Ignite','muscleyn-ignite','2026-06-14 17:51:05.212542'),(4,'2026-05-31 22:45:01.524261',_binary '','https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=600&auto=format&fit=crop','Muscleyn Cut','muscleyn-cut','2026-06-14 17:51:05.212542'),(7,'2026-06-15 16:42:40.455556',_binary '','/uploads/products/1781541760455_test.png','Brand With Image','brand-with-image','2026-06-15 16:42:40.455568');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `variant_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKennwa8klqyqrkq70971aw5m3q` (`variant_id`),
  CONSTRAINT `FKennwa8klqyqrkq70971aw5m3q` FOREIGN KEY (`variant_id`) REFERENCES `product_variant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK46ccwnsi9409t36lurvtyljak` (`name`),
  UNIQUE KEY `UKhqknmjh5423vchi4xkyhxlhg2` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (2,'2026-05-31 22:45:01.524261','https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop',_binary '','Performance','performance','2026-06-14 17:51:05.212542'),(3,'2026-05-31 22:45:01.524261','https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1200&auto=format&fit=crop',_binary '','Weight Management','weight-management','2026-06-14 17:51:05.212542'),(5,'2026-06-15 16:37:21.109323',NULL,_binary '','Test Category','test-category','2026-06-15 16:37:21.109379');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms`
--

DROP TABLE IF EXISTS `cms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cms` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cms_key` varchar(255) DEFAULT NULL,
  `cms_value` longtext,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK4rkrh93f96r50kmwc0ywbjbgd` (`cms_key`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms`
--

LOCK TABLES `cms` WRITE;
/*!40000 ALTER TABLE `cms` DISABLE KEYS */;
INSERT INTO `cms` VALUES (1,'authenticity-links','[]','2026-06-20 06:35:31.606170','2026-06-20 06:35:31.606173'),(2,'flash-sale-offer','{\"active\":false,\"title\":\"Flash Sale Active\",\"subtitle\":\"Up to 40% off on all whey proteins.\",\"hours\":12,\"minutes\":45,\"seconds\":30}','2026-06-20 06:52:57.031933','2026-06-20 15:19:04.395611'),(3,'deals-of-the-day','[3,1,2,6,4]','2026-06-20 07:37:37.171165','2026-06-20 14:45:01.307180'),(4,'privacy-policy','This Privacy Policy (\"Policy\") explains how Prabha Pharma (\"we\", \"us\", \"our\") collects, uses, stores,\nshares, and protects your personal information when you visit www.prabhapharma.com or make a\npurchase. This Policy is compliant with the Information Technology Act, 2000, the Information\nTechnology (Reasonable Security Practices and Procedures and Sensitive Personal Data or\nInformation) Rules, 2011 (\"SPDI Rules\"), and the Consumer Protection Act, 2019.\nBy using our Website, you consent to the collection and use of your personal information as described\nin this Policy. If you do not agree, please do not use our Website.\n\n\n1. Information We Collect\nPrabha Pharma collects the following categories of information:\n\nA. Personal Information (provided by you):\n• Full name, email address, mobile number, and delivery address.\n• Login credentials (if you create an account on our Website).\n• Payment details (processed securely through third-party payment gateways; we do not store\ncard or banking data).\n• Ayurvedic prescription details (if submitted for applicable products requiring a prescription).\n• Communications with us (emails, support tickets, grievance records).\n\nB. Automatically Collected Information:\n• IP address, browser type, device type, and operating system.\n• Pages visited, time spent on pages, and referring URLs.\n• Cookies and similar tracking technologies (see Section 8 on Cookies).\nC. Sensitive Personal Data or Information (SPDI) as defined under the SPDI Rules, 2011:\n\n• Health-related information or medical history provided voluntarily for product guidance or\nprescription verification purposes.\nImportant: Prabha Pharma collects health-related information only when voluntarily provided by you\nand only for the purpose of assisting you with product suitability or prescription verification. This\ninformation is treated with the highest level of confidentiality.\n\n\n2. Purpose of Data Collection\nWe collect and process your personal information for the following specific purposes only:\n• Processing and fulfilling your orders and delivering products to your address.\n• Sending order confirmation, dispatch, and delivery notifications.\n• Verifying Ayurvedic prescriptions where required under the Drugs and Cosmetics Act, 1940.\n• Issuing GST-compliant invoices (GSTIN: 23ASBPT5260C1Z2).\n• Responding to your queries, complaints, or grievances.\n• Preventing fraud, misuse, or unauthorised access to our Website.\n• Complying with applicable Indian laws and regulations.\n• Sending product updates, offers, or newsletters — only with your consent (you may opt out\nat any time).\nWe do NOT collect your personal information for any purpose other than those listed above.\n\n\n3. Legal Basis for Processing\nPrabha Pharma processes your personal data on the following legal bases:\n• Contractual Necessity: To fulfil your order and provide related services.\n• Legal Obligation: To comply with applicable Indian laws including the IT Act 2000, SPDI\nRules 2011, GST Act 2017, Drugs and Cosmetics Act 1940, and FSSAI Act 2006.\n• Legitimate Interest: To detect fraud, maintain Website security, and improve our services.\n• Consent: For marketing communications. You may withdraw consent at any time by\nemailing support@prabhapharma.com.\n\n\n4. Data Sharing & Third-Party Disclosure\nPrabha Pharma does NOT sell, rent, trade, or share your personal information with any third party for\ncommercial purposes. We share your data only in the following strictly limited circumstances:\n• Logistics / Courier Partners: Your name, phone number, and delivery address are shared\nwith our authorised courier partners solely for the purpose of order delivery.\n• Payment Gateways: Payment processing is handled by RBI-compliant, PCI-DSS certified\nthird-party payment gateways. We do not receive or store your card or banking credentials.\n• AYUSH-Licensed Manufacturers / Suppliers (where applicable): Limited to the extent\nnecessary for prescription verification or product sourcing queries.\n• Legal Compliance: We may disclose your information if required to do so by law, court\norder, or a competent government authority in India.\nAll third parties with whom we share data are contractually obligated to maintain confidentiality and\nuse the data only for the specified purpose.\n\n\n5. Data Storage & Security\nPrabha Pharma is committed to protecting your personal information and implements the following\nsecurity measures in compliance with the SPDI Rules, 2011:\n• All personal data is stored on secure servers with industry-standard encryption.\n• Access to personal data is restricted to authorised personnel only, on a need-to-know basis.\n• We do not store credit card, debit card, or net banking credentials on our servers.\n• All data transmission on the Website is protected using SSL / TLS encryption.\n• Regular security audits and vulnerability assessments are conducted.\nWhile we implement robust security measures, no system can guarantee 100% security. In the event\nof a data breach, we will notify affected users as required by applicable law.\n\n\n6. Data Retention\nPrabha Pharma retains your personal data only for as long as necessary to fulfil the purposes outlined\nin this Policy:\n• Order and transaction records: Retained for 7 years as required under the GST Act, 2017\nand Indian accounting standards.\n• Customer account data: Retained until you request deletion or close your account.\n• Prescription records: Retained for the period required under the Drugs and Cosmetics Act,\n1940 and applicable AYUSH regulations.\n• Marketing consent records: Retained until you withdraw consent.\nAfter the applicable retention period, personal data is securely deleted or anonymised.\n\n\n7. Your Rights as a Data Principal (Under Indian Law)\nAs a user whose personal data we process, you have the following rights under the SPDI Rules, 2011\nand applicable Indian law:\n• Right to Access: Request a copy of the personal information we hold about you.\n• Right to Correction: Request correction of inaccurate or incomplete personal information.\n• Right to Withdrawal of Consent: Withdraw consent for marketing communications at any\ntime.\n• Right to Grievance Redressal: Raise a complaint regarding how your data is handled.\nTo exercise any of the above rights, please contact our Grievance Officer, Mr. Kartikey Thakur, at\nsupport@prabhapharma.com or +91-8319904542. We will respond within 30 days of receiving your\nrequest.\n\n\n8. Cookies Policy\nwww.prabhapharma.com uses cookies and similar tracking technologies to enhance your browsing\nexperience:\n• Essential Cookies: Necessary for the Website to function (e.g., shopping cart, login\nsession). These cannot be disabled.\n• Analytics Cookies: Help us understand how visitors use the Website (e.g., pages visited,\ntime spent). Used for Website improvement only.\n• Marketing Cookies: Used to show relevant product offers. Enabled only with your consent.\nYou can manage or disable non-essential cookies through your browser settings at any time.\nDisabling cookies may affect certain Website features.\n\n\n9. Children\'s Privacy\nOur Website and products are not directed at persons below the age of 18 years. Prabha Pharma\ndoes not knowingly collect personal information from minors. If you believe that a minor has provided\nus with personal information without parental consent, please contact us immediately at\nsupport@prabhapharma.com. We will promptly delete such information upon verification.\n\n\n10. Links to Third-Party Websites\nOur Website may contain links to third-party websites (e.g., payment gateways, courier tracking\nportals, regulatory authority websites). These links are provided for convenience only. Prabha Pharma\nis not responsible for the privacy practices, content, or security of any third-party website. We\nencourage you to read the privacy policy of every website you visit.\n\n\n11. Grievance Officer – Privacy Complaints\nIn compliance with the IT Act, 2000 and SPDI Rules, 2011, Prabha Pharma has designated a\nGrievance Officer for privacy-related concerns:\n• Name: Mr. Kartikey Thakur\n• Designation: Grievance Officer, Prabha Pharma\n• Email: support@prabhapharma.com\n• Phone: +91-8319904542\n• Address: B-10 Nirmal Estate, Narmadapuram Road, Misrod, Bhopal, Madhya Pradesh –\n462047\n• Working Hours: Monday to Saturday, 10:00 AM – 6:00 PM IST\nAll privacy-related complaints will be acknowledged within 48 hours and resolved within 30 days of\nreceipt.\n\n\n12. Changes to This Privacy Policy\nPrabha Pharma reserves the right to update this Privacy Policy at any time to reflect changes in our\nbusiness practices, products, or applicable law. The updated Policy will be posted on\nwww.prabhapharma.com with the revised effective date. We encourage you to review this Policy\nperiodically. Continued use of the Website after any update constitutes your acceptance of the revised\nPrivacy Policy.\n\n\n13. Contact Us for Privacy Concerns\nFor any questions, concerns, or requests relating to this Privacy Policy or the handling of your\npersonal data, please contact:\n• Email: theprabhapharma@gmail.com | support@prabhapharma.com\n• Phone: +91-8319904542 | +91-9685373801\n• Address: B-10 Nirmal Estate, Narmadapuram Road, Misrod, Bhopal, Madhya Pradesh –\n462047','2026-06-20 10:07:53.557365','2026-06-20 14:22:47.730935'),(5,'terms-and-conditions','Please read these Terms and Conditions (\"Terms\") carefully before accessing\nwww.prabhapharma.com or placing any order. By using our Website or making a purchase, you agree\nto these Terms in full. If you do not agree, please do not use our Website or services.\n\n\n1. About Prabha Pharma\nPrabha Pharma is a duly registered trading and distribution business specialising in Ayurvedic\nmedicinal products and plant-based nutraceuticals and protein supplements. All products are sourced\nexclusively from licensed, regulatory-compliant manufacturers and suppliers in India.\n• Legal Name: Prabha Pharma\n• Nature of Business: Trading & Distribution – Ayurvedic Products and Plant-Based\nNutraceuticals / Protein Supplements\n• Registered Address: B-10 Nirmal Estate, Narmadapuram Road, Misrod, Bhopal, Madhya\nPradesh – 462047\n• GSTIN: 23ASBPT5260C1Z2\n• Email: theprabhapharma@gmail.com | support@prabhapharma.com\n• Phone: +91-8319904542 | +91-9685373801\n• Website: www.prabhapharma.com\n\n\n2. Definitions\n• \"Website\" – www.prabhapharma.com and any associated mobile application or platform.\n• \"We / Us / Our / Company\" – Prabha Pharma.\n• \"You / User / Customer / Buyer\" – any person accessing the Website or placing an order.\n• \"Ayurvedic Product\" – any medicine, formulation, or product regulated under Schedule E\nand Schedule VI of the Drugs and Cosmetics Act, 1940 and AYUSH Ministry guidelines.\n• \"Nutraceutical / Plant-Based Protein / Health Supplement\" – any product regulated under\nFSS (Health Supplements, Nutraceuticals) Regulations, 2022 under the FSSAI Act, 2006.\n• \"Product\" or \"Goods\" – collectively, Ayurvedic products and plant-based nutraceuticals /\nprotein supplements listed on the Website.\n• \"Order\" – a confirmed purchase request placed by the Customer.\n\n\n3. Governing Laws & Regulatory Compliance\nThese Terms are governed by the laws of India. Prabha Pharma operates in full compliance with:\n• Consumer Protection Act, 2019 and Consumer Protection (E-Commerce) Rules, 2020\n• Information Technology Act, 2000 and IT (Amendment) Act, 2008\n• Indian Contract Act, 1872 and Sale of Goods Act, 1930\n• Drugs and Cosmetics Act, 1940 – Schedule E (Ayurvedic Medicines) and Schedule VI\n(Standards for ASU Medicines)\n• Ministry of AYUSH Guidelines on Ayurvedic Products, Labelling, and Advertising\n• Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954\n• Food Safety and Standards Act, 2006 (FSSAI)\n• Food Safety and Standards (Health Supplements, Nutraceuticals) Regulations, 2022\n• Legal Metrology Act, 2009\n• Goods and Services Tax (GST) Act, 2017\nAll disputes shall be subject to the exclusive jurisdiction of the competent courts in Bhopal, Madhya\nPradesh, India.\n\n\n4. Eligibility\n• You must be at least 18 years of age. Minors may use the Website only under parental or\nguardian supervision.\n• You must be legally capable of entering into a binding contract under the Indian Contract\nAct, 1872.\n• You shall provide accurate, complete, and up-to-date information at all times.\nImportant: Certain Ayurvedic medicines may require a prescription from a registered Ayurvedic medical\npractitioner (BAMS or equivalent). Prabha Pharma reserves the right to withhold dispatch until a valid\nprescription is verified.\n\n\n5. Mandatory Business Disclosures (E-Commerce Rules 2020, Rule 5)\n• Legal Name: Prabha Pharma\n• Registered Address: B-10 Nirmal Estate, Narmadapuram Road, Misrod, Bhopal, Madhya\nPradesh – 462047\n• Email: theprabhapharma@gmail.com | support@prabhapharma.com\n• Phone: +91-8319904542 | +91-9685373801\n• GSTIN: 23ASBPT5260C1Z2\n• Grievance Officer: Mr. Kartikey Thakur | support@prabhapharma.com | +91-8319904542\n• Acknowledgement within 48 hours; Resolution within 30 days.\n\n\n6. Product Categories & Regulatory Disclaimers\nPrabha Pharma lists the following on its Website:\n• Ayurvedic Medicines & Formulations (Churna, Kadha, Vati, Asava, Arishta, Tail, Ghrita, etc.)\n– sourced from AYUSH-licensed manufacturers.\n• Ayurvedic Health & Wellness Products (Classical and Proprietary Ayurvedic preparations).\n• Plant-Based Protein Supplements (Pea, Brown Rice, Hemp, Soy Protein and blends) –\nregulated under FSSAI.\n• Plant-Based Nutraceuticals (Herbal extracts, Adaptogens, Phytonutrients, Botanical\nsupplements) – regulated under FSSAI.\nAll Ayurvedic products are sourced from manufacturers holding a valid AYUSH Drug Manufacturing\nLicence. All nutraceutical and protein products are sourced from FSSAI-licensed manufacturers.\nImportant: Prabha Pharma does not claim that any Ayurvedic product or nutraceutical can diagnose,\ntreat, cure, or prevent any disease, unless expressly permitted under AYUSH or FSSAI regulations. All\nproducts are intended to support health and wellness as a supplement to a balanced diet and lifestyle.\nPlease consult a qualified Ayurvedic practitioner or healthcare professional before use, especially if\npregnant, nursing, or suffering from any medical condition. Advertising on this Website complies with\nthe Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954.\n\n\n7. Pricing, GST & Invoicing\n• All prices are in Indian Rupees (INR), inclusive of applicable GST unless stated otherwise.\n• A GST-compliant tax invoice (GSTIN: 23ASBPT5260C1Z2) will be issued for every\npurchase.\n• Prices are subject to change. The price at order confirmation shall be honoured.\n• Pricing errors entitle us to cancel the order and issue a full refund.\n\n\n8. Order Placement & Acceptance\nYour order is an offer to purchase. Prabha Pharma\'s acceptance is complete upon dispatch. We may\ncancel orders for: stock unavailability, pricing errors, non-receipt of required Ayurvedic prescription,\nsuspected fraud, or regulatory restrictions. A 100% refund will be issued within 7 working days for\npost-payment cancellations by us.\n\n\n9. Payment Terms\n• Full payment required at checkout via UPI, Net Banking, Credit/Debit Card, Wallets, or other\nlisted methods.\n• Transactions processed through RBI-compliant, PCI-DSS secured gateways.\n• Prabha Pharma does not store card or banking credentials.\n• In case of payment failure with amount debited, do not retry — contact +91-8319904542\nimmediately.\n\n\n10. Shipping & Delivery\n• Dispatch timelines communicated at checkout are estimates, not guarantees.\n• Risk and ownership transfer upon delivery to the provided address.\n• We are not liable for delays due to courier, natural calamities, government orders, or force\nmajeure.\n• Damaged or tampered packages must be refused and reported with photographs within 24\nhours.\n• Currently shipping within India only.\nImportant: Certain Ayurvedic formulations and plant-based proteins require specific storage conditions.\nPrabha Pharma ensures appropriate dispatch packaging. We are not liable for quality loss due to\nimproper storage after delivery. Follow label storage instructions.\n\n\n11. Sourcing & Quality Assurance\n• All Ayurvedic products sourced from AYUSH-licensed manufacturers under the Drugs and\nCosmetics Act, 1940.\n• All nutraceutical and protein products sourced from FSSAI-licensed food business\noperators.\n• Prabha Pharma does not deal in spurious, adulterated, misbranded, or sub-standard\nproducts.\n• All products carry valid batch numbers, manufacturing and expiry dates, and MRP as per\nlabelling regulations.\n• Prabha Pharma, as the seller, takes full responsibility for authenticity and quality of all\nproducts on its Website.\n\n\n12. User Responsibilities & Prohibited Conduct\nYou agree NOT to: use the Website unlawfully; misrepresent your identity or health details; attempt\nunauthorised access; upload malicious code; post false reviews; or resell products without\nauthorisation. Violations may attract legal action under the IT Act 2000, Drugs and Cosmetics Act\n1940, and FSSAI Act 2006.\n\n\n13. Intellectual Property Rights\nThe brand name \'Prabha Pharma\', tagline \'Pure • Proven • Potent\', all logos, images, product listings,\nand website content are the exclusive intellectual property of Prabha Pharma, protected under the\nCopyright Act, 1957 and Trade Marks Act, 1999. Unauthorised use is strictly prohibited.\n\n\n14. Limitation of Liability & Disclaimer\n• Prabha Pharma is not liable for indirect, incidental, punitive, or consequential damages.\n• Not liable for adverse reactions from misuse, self-medication, or non-compliance with\ndosage instructions.\n• Total liability shall not exceed the invoice value of the product in dispute.\n• Products sold subject to the manufacturer\'s warranties. No additional warranties expressed\nor implied.\n\n\n15. Grievance Redressal (Consumer Protection Act, 2019)\n• Name: Mr. Kartikey Thakur\n• Email: support@prabhapharma.com | Phone: +91-8319904542\n• Address: B-10 Nirmal Estate, Narmadapuram Road, Misrod, Bhopal, Madhya Pradesh –\n462047\n• Hours: Monday to Saturday, 10:00 AM – 6:00 PM IST\n• Acknowledgement: 48 hours | Resolution: within 30 days\nFor further escalation: National Consumer Helpline: 1800-11-4000 | eDaakhil: edaakhil.nic.in |\nFSSAI: 1800-11-2100 | AYUSH: ayush.gov.in | Consumer Commission, Bhopal, MP\n\n\n16. General Provisions\nPrabha Pharma may update these Terms at any time. Continued use constitutes acceptance. If any\nprovision is invalid, remaining provisions stay in force. These Terms, Return & Refund Policy, and\nPrivacy Policy together form the entire agreement between you and Prabha Pharma.','2026-06-20 10:08:00.027723','2026-06-20 14:21:16.956845'),(6,'goals-list','[{\"title\":\"Muscle Gain\",\"copy\":\"Heavy calorie stacks for bulking\",\"img\":\"https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop\"},{\"title\":\"Fat Loss\",\"copy\":\"Clean energy and cutting support\",\"img\":\"https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=800&auto=format&fit=crop\"},{\"title\":\"Recovery\",\"copy\":\"Protein and sleep-friendly nutrition\",\"img\":\"https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop\"}]','2026-06-20 12:02:28.692010','2026-06-21 07:41:13.079041'),(7,'blogs-list','[{\"id\":1,\"tag\":\"Nutrition\",\"tagSub\":\"Featured \",\"date\":\"November 28, 2026\",\"author\":\"Dr. Manish Kumar, MD\",\"readTime\":\"4 min read\",\"title\":\"Top Food for Protein\",\"summary\":\"Protein as the building block of a diet which makes it an essential element in a well-balanced diet. Discover the ultimate protein sources to fuel muscle hypertrophy and daily recovery.\",\"content\":\"When it comes to muscle, protein is the single most critical macronutrient. However, not all proteins are created equal. Biological value (BV) and amino acid profile dictate how effectively your body utilizes protein. To maximize hypertrophy, athletes should prioritize whole food sources rich in leucine and essential amino acids (EAAs).\\n\\nTop sources include chicken breast, egg whites, lean beef, wild-caught salmon, and Greek yogurt. Plant-based lifters can rely on organic tofu, tempeh, lentils, and premium pea-rice isolate blends. Incorporating these foods consistently into your meals provides a sustained release of amino acids, maintaining an anabolic state throughout the day.\",\"image\":\"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop\",\"images\":[\"/uploads/products/c4f13361-b668-47e7-9f41-20c8196198db_download.jpeg\",\"/uploads/products/b25691a6-f9f6-4e49-9a40-d00a4ad33cf2_images.jpeg\"],\"link\":\"/blogs\"},{\"id\":1782027293278,\"tag\":\"Nutrition\",\"tagSub\":\"High Protein\",\"date\":\"Nov 07 2026\",\"author\":\"Manish\",\"readTime\":\"5 min\",\"title\":\"HeadLine\",\"summary\":\"Short Summary\",\"content\":\"Blog post\",\"image\":\"/uploads/products/92c8b369-ecb0-48ae-bed1-b2744ac2afd1_download.jpeg\",\"images\":[],\"link\":\"/blogs\"}]','2026-06-20 12:02:28.710026','2026-06-21 07:36:41.592730'),(8,'news-list','[{\"id\":1,\"publisher\":\"ET Industry Changemakers (North 2026)\",\"date\":\"June 15, 2020\",\"headline\":\"Prabha Pharma Honored with the Northern Region Industry Changemaker Award 2026\",\"summary\":\"Recognized for disruptive clean formulations and supply chain integrity in the sports nutrition sector.\",\"detail\":\"Prabha Pharma has been awarded the prestigious \'ET Industry Changemakers Award 2026\' for the Northern Region. The award committee cited our commitment to absolute ingredient transparency, third-party batch testing, and removing proprietary blends from fitness supplements as key factors. By creating clean, high-efficacy options under the Muscleyn line, Prabha Pharma is raising the bar for the entire Indian supplements industry.\",\"icon\":\"Award\",\"images\":[]},{\"id\":2,\"publisher\":\"ET Brand Equity\",\"date\":\"May 22, 2026\",\"headline\":\"Marketing Authenticity: How Prabha Pharma Replaced Gym-Bro Noise with Clinical Standards\",\"summary\":\"A deep dive into how transparency and batch certificates became our primary marketing campaign.\",\"detail\":\"In an industry historically driven by aggressive and misleading claims, Prabha Pharma\'s \'Authenticity First\' approach is carving a new path. Brand Equity analyzes how launching public-access lab certificates and Labdoor certifications built a strong foundation of trust among gen-z and millennial athletes, leading to a 40% year-on-year growth.\",\"icon\":\"TrendingUp\"},{\"id\":3,\"publisher\":\"afaqs!\",\"date\":\"April 18, 2026\",\"headline\":\"Prabha Pharma Launches #GenuinePerformers Campaign for Muscleyn Series\",\"summary\":\"The marketing push includes QR code verifications and partnerships with elite IFBB coaches.\",\"detail\":\"Afaqs reports on Prabha Pharma\'s new marketing roadmap for the Muscleyn product stack. The campaign highlights double-blind lab testing and unique QR scanning on each bottle to verify authentic packaging and content. With fitness influencers like Aarush Bhola on board, the campaign is setting records for direct-to-consumer engagement.\",\"icon\":\"Newspaper\"},{\"id\":4,\"publisher\":\"THE WEEK\",\"date\":\"March 10, 2026\",\"headline\":\"Supplements Audit: How Sourcing Dictates Fitness Progress\",\"summary\":\"The Week investigates how Prabha Pharma isolates components to maintain pharmaceutical grade quality.\",\"detail\":\"Sourcing ingredients of raw whey, creatine, and amino acids is notorious for quality fluctuation. The Week\'s investigative team audits Prabha Pharma\'s sourcing nodes in Germany and Ireland, confirming that their pharmaceutical standards avoid bulk fillers and heavy metals, resulting in a cleaner product stack.\",\"icon\":\"Newspaper\"},{\"id\":5,\"publisher\":\"GQ\",\"date\":\"February 24, 2026\",\"headline\":\"The Elite Fitness Stack: Why Athletes are Swapping to Prabha Pharma\'s Formulas\",\"summary\":\"GQ editors test the premium isolates and pre-workout stacks designed for high performance.\",\"detail\":\"Our GQ editors tested the Muscleyn Elite Whey Isolate and Pre-Workout stack for 6 weeks. The results are clear: the clean mixability and caffeine-tea-extract ratio deliver high performance outputs without the digestive discomfort or energy crashes typical of competitor formulas.\",\"icon\":\"Star\"}]','2026-06-20 12:02:28.712963','2026-06-21 07:54:02.098176'),(9,'blogs-page-header','{\"title\":\"Our Blogs\",\"subtitle\":\"Science-backed articles, sports nutrition reports, and training insights curated by our medical and coaching panels.\"}','2026-06-20 13:26:35.310734','2026-06-20 14:05:30.506423'),(10,'news-page-header','{\"title\":\"Our News\",\"subtitle\":\"Media features, corporate announcements, and press coverage of our award-winning clean sports nutrition initiatives.\"}','2026-06-20 13:26:35.352077','2026-06-20 14:06:57.046117'),(11,'return-refund-policy','Default Return and Refund Policy: Prabha Pharma is dedicated to customer satisfaction. Unopened products in their original packaging can be returned within 14 days of delivery. Please contact support for assistance.','2026-06-20 14:35:44.453417','2026-06-20 14:35:44.453421'),(12,'trust-ticker-list','[\"50K+ Customers\",\"10K+ Orders Delivered\",\"Trusted By Athlete\",\"500+ Products\"]','2026-06-20 14:49:48.977664','2026-06-20 14:57:21.565539'),(13,'contact-header','{\n          \"eyebrow\": \"Contact Us\",\n          \"title\": \"Need help with products, orders, or your stack?\",\n          \"description\": \"Reach the Muscleyn support team for product guidance, order questions, partnerships, or business enquiries.\",\n          \"bgImage\": \"https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1800&auto=format&fit=crop\"\n        }','2026-06-20 15:07:26.068944','2026-06-20 15:07:26.068949'),(14,'contact-info-cards','[\n          { \"icon\": \"Phone\", \"title\": \"Phone\", \"value\": \"+91 98765 43210\" },\n          { \"icon\": \"Mail\", \"title\": \"Email\", \"value\": \"support@muscleyn.com\" },\n          { \"icon\": \"MapPin\", \"title\": \"Business\", \"value\": \"Fitness District, Indore, India\" },\n          { \"icon\": \"Clock\", \"title\": \"Support Hours\", \"value\": \"Mon-Sat, 10:00 AM - 7:00 PM\" }\n        ]','2026-06-20 15:07:26.125899','2026-06-20 15:07:26.125910'),(15,'contact-support-cards','[\n          { \"icon\": \"Headphones\", \"title\": \"Order Support\", \"copy\": \"Delivery, payment, returns\" },\n          { \"icon\": \"MessageCircle\", \"title\": \"Stack Guidance\", \"copy\": \"Goal-based supplement advice\" },\n          { \"icon\": \"Send\", \"title\": \"Social\", \"copy\": \"Follow drops and athlete stories\" }\n        ]','2026-06-20 15:07:26.130231','2026-06-20 15:07:26.130242'),(16,'contact-stores','[\n          {\n            \"id\": \"indore\",\n            \"name\": \"Muscleyn Indore HQ\",\n            \"address\": \"Vijay Nagar, Indore, Madhya Pradesh 452010\",\n            \"timings\": \"Mon-Sat, 10 AM - 7 PM\",\n            \"mapUrl\": \"https://www.google.com/maps?q=22.7533,75.8937&z=16&output=embed\",\n            \"directionsUrl\": \"https://www.google.com/maps?q=22.7533,75.8937\"\n          },\n          {\n            \"id\": \"mumbai\",\n            \"name\": \"Muscleyn Mumbai Experience Center\",\n            \"address\": \"Bandra West, Link Road, Mumbai, Maharashtra 400050\",\n            \"timings\": \"Mon-Sun, 11 AM - 8 PM\",\n            \"mapUrl\": \"https://www.google.com/maps?q=19.0600,72.8311&z=16&output=embed\",\n            \"directionsUrl\": \"https://www.google.com/maps?q=19.0600,72.8311\"\n          },\n          {\n            \"id\": \"delhi\",\n            \"name\": \"Muscleyn Delhi Experience Center\",\n            \"address\": \"Connaught Place, Radial Road 1, New Delhi 110001\",\n            \"timings\": \"Mon-Sun, 10 AM - 9 PM\",\n            \"mapUrl\": \"https://www.google.com/maps?q=28.6304,77.2177&z=16&output=embed\",\n            \"directionsUrl\": \"https://www.google.com/maps?q=28.6304,77.2177\"\n          },\n          {\n            \"id\": \"bengaluru\",\n            \"name\": \"Muscleyn Bengaluru Experience Center\",\n            \"address\": \"Indiranagar, 100 Feet Rd, Bengaluru, Karnataka 560038\",\n            \"timings\": \"Mon-Sat, 10 AM - 8 PM\",\n            \"mapUrl\": \"https://www.google.com/maps?q=12.9719,77.6412&z=16&output=embed\",\n            \"directionsUrl\": \"https://www.google.com/maps?q=12.9719,77.6412\"\n          }\n        ]','2026-06-20 15:07:26.133963','2026-06-20 15:07:26.133972'),(17,'contact-faqs','[\n          {\n            \"question\": \"How fast do you ship orders?\",\n            \"answer\": \"Most orders are prepared within 24 hours. Final delivery depends on the destination and courier coverage.\"\n          },\n          {\n            \"question\": \"Can I get help choosing a supplement stack?\",\n            \"answer\": \"Yes. Share your training goal, diet preference, and budget through the contact form and support can guide you.\"\n          },\n          {\n            \"question\": \"Do you support cash on delivery?\",\n            \"answer\": \"COD can be enabled based on delivery location and order value. The checkout flow is structured for this support.\"\n          }\n        ]','2026-06-20 15:07:26.137928','2026-06-20 15:07:26.137939'),(18,'authenticity-hero','{\"tagline\":\"Authenticity & Testing\",\"subtitle\":\"Manufactured In\",\"title\":\"WORLD CLASS FACILITY\",\"bgImage\":\"/uploads/products/a8f41360-4e63-4c42-b2e9-7d654941af7c_download.jpeg\",\"badges\":[{\"code\":\"cGMp\",\"title\":\"cGMp Certified\",\"subtitle\":\"Current Protein\",\"color\":\"yellow\"},{\"code\":\"HACCP\",\"title\":\"HACCP Safety\",\"subtitle\":\"Food Safety Certified\",\"color\":\"blue\"},{\"code\":\"fssai\",\"title\":\"fssai approved\",\"subtitle\":\"Standard Compliance\",\"color\":\"green\"},{\"code\":\"KOSHER\",\"title\":\"Kosher Food\",\"subtitle\":\"Pure Ingredients\",\"color\":\"emerald\"},{\"code\":\"FSSC\",\"title\":\"FSSC 22000\",\"subtitle\":\"Sustained Quality\",\"color\":\"teal\"},{\"code\":\"100%\",\"title\":\"Third Party\",\"subtitle\":\"Independent Lab Tested\",\"color\":\"red\"},{\"code\":\"100% FSSAI\",\"title\":\"CGMP Certfied\",\"subtitle\":\"Current Practiceeeeeee\",\"color\":\"orange\"}]}','2026-06-21 07:44:43.187602','2026-06-21 07:51:08.199675'),(19,'footer-config','{\"whyChoose\":[{\"value\":\"100+\",\"label\":\"Products\",\"style\":\"default\"},{\"value\":\"10 Years\",\"label\":\"Experience\",\"style\":\"grey\"}],\"newsletter\":{\"title\":\"NewsLTR\",\"description\":\"Subscribe to get access to early access exclusive drops, new formulations, and members-only deals.\"},\"socials\":{\"fb\":\"https://www.facebook.com/\",\"ig\":\"https://www.instagram.com\",\"tw\":\"https://x.com/\",\"yt\":\"https://www.youtube.com/\"}}','2026-06-21 07:44:43.230816','2026-06-21 08:33:12.381699'),(20,'website-logo','/uploads/products/47c022f3-dddd-4b2f-8bd1-58daadfe6c32_download.jpeg','2026-06-21 07:47:55.716909','2026-06-21 07:47:55.716924'),(21,'authenticity-page-config','{\n          \"hero\": {\n            \"eyebrow\": \"Authenticity Guaranteed\",\n            \"title\": \"Quality Meets Authenticity\",\n            \"description\": \"Our guarantee stands strong. Every product sold on Prabha Pharma carries a Trust Seal — scan it to verify authenticity and access NABL-certified lab reports instantly.\",\n            \"bgImage\": \"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1800&auto=format&fit=crop\"\n          },\n          \"explainer\": {\n            \"eyebrow\": \"What is a Trust Seal?\",\n            \"title\": \"Trust Seal for Protein Authenticity & Report\",\n            \"description\": \"The Trust Seal is used to authenticate and verify your product. Additionally, you can check the lab reports tested by NABL-accredited labs which showcase the protein content, heavy metal profile, amino acid profiles, and more.\",\n            \"scratchCode\": \"BM-AAX5010\",\n            \"scanText\": \"Scan for labs & use the scratch code for authentication\",\n            \"points\": [\n              \"NABL-accredited third-party lab testing\",\n              \"Protein content verification\",\n              \"Heavy metal profiling\",\n              \"Amino acid profile analysis\",\n              \"Holographic scratch-code anti-counterfeit\"\n            ]\n          },\n          \"process\": {\n            \"eyebrow\": \"Simple Process\",\n            \"title\": \"Product Authentication Tips\",\n            \"description\": \"Three easy steps to verify that what you\'re consuming is genuine, tested, and safe.\",\n            \"steps\": [\n              {\n                \"step\": \"01\",\n                \"title\": \"Scan the Trust Seal\",\n                \"description\": \"Find the holographic Trust Seal sticker on your product packaging and scan the QR code using any smartphone camera.\",\n                \"iconName\": \"ScanLine\"\n              },\n              {\n                \"step\": \"02\",\n                \"title\": \"You\'re on Our Website\",\n                \"description\": \"The QR code lands you directly on our official Prabha Pharma verification portal — no third-party redirects.\",\n                \"iconName\": \"ShieldCheck\"\n              },\n              {\n                \"step\": \"03\",\n                \"title\": \"View Lab Test Report\",\n                \"description\": \"Access the full NABL-accredited third-party lab report showing protein content, heavy metal profile, and amino acid analysis.\",\n                \"iconName\": \"FlaskConical\"\n              }\n            ]\n          },\n          \"certification\": {\n            \"eyebrow\": \"Third-Party Certified\",\n            \"title\": \"Every Batch. Every Test.\",\n            \"description\": \"Our products are independently tested by NABL-accredited laboratories. The results are published and accessible to every customer through the Trust Seal QR code on the product.\",\n            \"sampleReportTitle\": \"Lab Report — Sample Result\",\n            \"sampleReportFooter\": \"Tested by SGS India Pvt. Ltd. | NABL Accredited | Certificate No. TC-7721\",\n            \"sampleResults\": [\n              { \"label\": \"Protein Percentage\", \"result\": \"Pass\" },\n              { \"label\": \"Heavy Metal\", \"result\": \"Pass\" },\n              { \"label\": \"Amino Acid Profile\", \"result\": \"Pass\" },\n              { \"label\": \"Microbial Safety\", \"result\": \"Pass\" }\n            ],\n            \"badges\": [\n              { \"label\": \"NABL Accredited\", \"sub\": \"Third-party lab tested\", \"iconName\": \"Award\" },\n              { \"label\": \"100% Authentic\", \"sub\": \"Verified with Trust Seal\", \"iconName\": \"ShieldCheck\" },\n              { \"label\": \"Protein Verified\", \"sub\": \"Clinically validated dosage\", \"iconName\": \"FlaskConical\" },\n              { \"label\": \"Heavy Metal Safe\", \"sub\": \"Within permissible limits\", \"iconName\": \"CheckCircle2\" }\n            ]\n          },\n          \"cta\": {\n            \"title\": \"Shop with Complete Confidence\",\n            \"description\": \"Every product on Prabha Pharma is backed by third-party lab testing and the Trust Seal guarantee. Your health deserves nothing less.\",\n            \"btnPrimaryText\": \"Shop Now\",\n            \"btnPrimaryLink\": \"/shop\",\n            \"btnSecondaryText\": \"Contact Support\",\n            \"btnSecondaryLink\": \"/contact\"\n          }\n        }','2026-06-21 07:56:37.403723','2026-06-21 07:56:37.403743'),(22,'business-enquiry-config','{\n          \"hero\": {\n            \"eyebrow\": \"B2B Partnerships\",\n            \"title\": \"Sell Muscleyn\",\n            \"description\": \"Expand your business by partnering with India\'s premium, NABL-certified, and third-party tested fitness supplement brand. Become a distributor today.\"\n          },\n          \"benefits\": [\n            { \"iconName\": \"ShieldAlert\", \"title\": \"100% Genuine Catalog\", \"desc\": \"Every supplement is third-party tested with QR code authenticity tags and lab report lookups.\" },\n            { \"iconName\": \"Percent\", \"title\": \"Competitive Margins\", \"desc\": \"Access bulk wholesale pricing tiers that leave you with industry-leading profit margins.\" },\n            { \"iconName\": \"Truck\", \"title\": \"Priority Fulfillment\", \"desc\": \"B2B orders are processed and shipped via express courier nodes directly to your business address.\" },\n            { \"iconName\": \"TrendingUp\", \"title\": \"Marketing Assets\", \"desc\": \"Receive premium in-store branding, shaker bottles, gym posters, and official merchandise.\" }\n          ],\n          \"contact\": {\n            \"email\": \"partners@muscleyn.com\",\n            \"phone\": \"+91 98765 43210\"\n          }\n        }','2026-06-21 08:08:57.208394','2026-06-21 08:08:57.208399'),(23,'home-brand-film','{\"eyebrow\":\"The Standard\",\"title\":\"Built for lifters who respect\",\"description\":\"Watch our latest campaign featuring IFBB Pro athletes pushing their limits. We formulate products for those who demand more from themselves and their nutrition.\",\"imageUrl\":\"/uploads/products/03f4a103-3174-494f-a4e7-c180d1ec20db_images.jpeg\"}','2026-06-21 08:44:54.536597','2026-06-21 09:00:20.179756'),(24,'home-why-choose-us','{\n          \"eyebrow\": \"Why Choose Us\",\n          \"title\": \"Premium quality without the gym-bro noise\",\n          \"description\": \"We believe in full transparency. No proprietary blends, no cheap fillers. Just clinically dosed, scientifically backed nutrition for real athletes.\",\n          \"cards\": [\n            { \"iconName\": \"ShieldCheck\", \"title\": \"Batch Tested\", \"copy\": \"Every batch is quality checked for consistency and purity by independent labs.\" },\n            { \"iconName\": \"Truck\", \"title\": \"Fast Fulfillment\", \"copy\": \"Optimized delivery flow and clear order updates. Next-day delivery on elite stacks.\" },\n            { \"iconName\": \"BadgeCheck\", \"title\": \"Authentic Formulas\", \"copy\": \"Transparent nutrition and premium sourcing. No proprietary blends or hidden fillers.\" },\n            { \"iconName\": \"Dumbbell\", \"title\": \"Athlete Focused\", \"copy\": \"Built around real training goals and routines, trusted by IFBB pros.\" }\n          ]\n        }','2026-06-21 08:44:54.586217','2026-06-21 08:44:54.586230'),(25,'home-section-visibility','{\"hero\":true,\"trustTicker\":true,\"dealOfTheDay\":true,\"shopByGoal\":true,\"featuredProducts\":true,\"realReviews\":true,\"whyChooseUs\":true,\"brandFilm\":true,\"bestSellers\":true,\"blogs\":true,\"news\":true}','2026-06-21 09:19:57.859317','2026-06-21 09:21:01.372557');
/*!40000 ALTER TABLE `cms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_enquiries`
--

DROP TABLE IF EXISTS `contact_enquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_enquiries` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `message` longtext NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `subject` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_enquiries`
--

LOCK TABLES `contact_enquiries` WRITE;
/*!40000 ALTER TABLE `contact_enquiries` DISABLE KEYS */;
INSERT INTO `contact_enquiries` VALUES (1,'2026-06-21 08:04:08.683213','partner@test.com','Test Partner','Type of Business: Gym Owner\nState: Madhya Pradesh\nCity: Indore\n\nComment/Enquiry:\nHello, I would like to wholesale Muscleyn protein for my gym.','9876543210','NEW','Business Enquiry: Gym Owner from Indore, Madhya Pradesh');
/*!40000 ALTER TABLE `contact_enquiries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon`
--

DROP TABLE IF EXISTS `coupon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupon` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `coupon_code` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `discount_type` enum('FLAT','PERCENTAGE') DEFAULT NULL,
  `discount_value` decimal(38,2) DEFAULT NULL,
  `expiry_date` datetime(6) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `maximum_discount` decimal(38,2) DEFAULT NULL,
  `minimum_amount` decimal(38,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKsre2vcap4vs6qucaksomk3c7s` (`coupon_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon`
--

LOCK TABLES `coupon` WRITE;
/*!40000 ALTER TABLE `coupon` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_order_items`
--

DROP TABLE IF EXISTS `customer_order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_order_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  `price` decimal(19,4) DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `product_image` varchar(255) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `quantity` decimal(19,4) DEFAULT NULL,
  `total_amount` decimal(19,4) DEFAULT NULL,
  `variant_id` bigint DEFAULT NULL,
  `variant_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_order_items`
--

LOCK TABLES `customer_order_items` WRITE;
/*!40000 ALTER TABLE `customer_order_items` DISABLE KEYS */;
INSERT INTO `customer_order_items` VALUES (1,'2026-05-31 23:26:46.690000',1,2499.0000,1,'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=1200&auto=format&fit=crop','Elite Whey Isolate',9.0000,22491.0000,1,'Default'),(2,'2026-05-31 23:26:46.698000',1,1099.0000,5,'https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1200&auto=format&fit=crop','Lean Burn L-Carnitine',2.0000,2198.0000,6,'Default'),(3,'2026-05-31 23:26:46.699000',1,1499.0000,3,'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop','Creatine Monohydrate Pro',1.0000,1499.0000,4,'Unflavoured 250 g'),(4,'2026-06-14 11:22:18.630000',2,2599.0000,1,'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=1200&auto=format&fit=crop','Elite Whey Isolate',1.0000,2599.0000,2,'Vanilla 2 kg'),(5,'2026-06-20 17:05:20.559000',3,2499.0000,6,'/uploads/products/1781952380136_Screenshot 2026-06-20 at 2.20.01 PM.jpg','Premium Gold Whey Protein',1.0000,2499.0000,9,'Default');
/*!40000 ALTER TABLE `customer_order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_orders`
--

DROP TABLE IF EXISTS `customer_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address_id` bigint DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `delivery_charge` decimal(19,4) DEFAULT NULL,
  `discount_amount` decimal(19,4) DEFAULT NULL,
  `final_amount` decimal(19,4) DEFAULT NULL,
  `order_status` enum('CANCELLED','CONFIRMED','DELIVERED','OUT_FOR_DELIVERY','PACKED','PENDING','PLACED','PROCESSING','REFUNDED','RETURNED','SHIPPED') DEFAULT NULL,
  `payment_gateway` varchar(255) DEFAULT NULL,
  `payment_method` enum('COD','ONLINE') DEFAULT NULL,
  `payment_status` enum('FAILED','PAID','PENDING','REFUNDED','SUCCESS') DEFAULT NULL,
  `total_amount` decimal(19,4) DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_orders`
--

LOCK TABLES `customer_orders` WRITE;
/*!40000 ALTER TABLE `customer_orders` DISABLE KEYS */;
INSERT INTO `customer_orders` VALUES (1,NULL,'2026-05-31 23:26:46.660000',0.0000,0.0000,26188.0000,'DELIVERED','RAZORPAY','COD','PENDING',26188.0000,NULL,1),(2,1,'2026-06-14 11:22:18.607000',0.0000,0.0000,2599.0000,'PENDING','RAZORPAY','COD','PENDING',2599.0000,NULL,1),(3,2,'2026-06-20 17:05:20.518000',0.0000,0.0000,2499.0000,'DELIVERED','RAZORPAY','COD','PENDING',2499.0000,NULL,3);
/*!40000 ALTER TABLE `customer_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `is_read` bit(1) DEFAULT NULL,
  `message` longtext,
  `title` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  `variant_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKt4dc2r9nbvbujrljv3e23iibt` (`order_id`),
  KEY `FKcvr1aqkc2suhg2lvuwpfe0q0s` (`variant_id`),
  CONSTRAINT `FKcvr1aqkc2suhg2lvuwpfe0q0s` FOREIGN KEY (`variant_id`) REFERENCES `product_variant` (`id`),
  CONSTRAINT `FKt4dc2r9nbvbujrljv3e23iibt` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (1,'2026-05-31 23:26:46.710136',2499.00,9,1,1),(2,'2026-05-31 23:26:46.710138',1099.00,2,1,6),(3,'2026-05-31 23:26:46.710139',1499.00,1,1,4),(4,'2026-06-14 11:22:18.646711',2599.00,1,2,2),(5,'2026-06-20 17:05:20.579970',2499.00,1,3,9);
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL,
  `address_id` bigint DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `order_status` enum('CANCELLED','CONFIRMED','DELIVERED','OUT_FOR_DELIVERY','PACKED','PENDING','PLACED','PROCESSING','REFUNDED','RETURNED','SHIPPED') DEFAULT NULL,
  `payment_gateway` enum('PHONEPE','RAZORPAY') DEFAULT NULL,
  `payment_method` enum('COD','ONLINE') DEFAULT NULL,
  `payment_status` enum('FAILED','PAID','PENDING','REFUNDED','SUCCESS') DEFAULT NULL,
  `total_amount` decimal(38,2) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,NULL,'2026-05-31 23:26:46.701878','DELIVERED','RAZORPAY','COD','PENDING',26188.00,'2026-05-31 23:26:46.701880',1),(2,1,'2026-06-14 11:22:18.634557','PLACED','RAZORPAY','COD','PENDING',2599.00,'2026-06-14 11:22:18.634575',1),(3,2,'2026-06-20 17:05:20.565430','DELIVERED','RAZORPAY','COD','PENDING',2499.00,'2026-06-20 17:05:20.565433',3);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_transaction`
--

DROP TABLE IF EXISTS `payment_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_transaction` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `failure_reason` varchar(255) DEFAULT NULL,
  `gateway_order_id` varchar(255) DEFAULT NULL,
  `gateway_payment_id` varchar(255) DEFAULT NULL,
  `gateway_response` longtext,
  `gateway_signature` varchar(255) DEFAULT NULL,
  `gateway_transaction_id` varchar(255) DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  `payment_gateway` varchar(255) DEFAULT NULL,
  `payment_status` enum('FAILED','PAID','PENDING','REFUNDED','SUCCESS') DEFAULT NULL,
  `refunded` bit(1) NOT NULL,
  `retry_count` int NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_transaction`
--

LOCK TABLES `payment_transaction` WRITE;
/*!40000 ALTER TABLE `payment_transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(9999) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `brand_id` bigint DEFAULT NULL,
  `sub_category_id` bigint DEFAULT NULL,
  `benefits` text,
  `nutrition` text,
  `is_best_seller` bit(1) DEFAULT NULL,
  `is_offer` bit(1) DEFAULT NULL,
  `product_report_url` varchar(255) DEFAULT NULL,
  `report_amino_acid_profile` varchar(255) DEFAULT NULL,
  `report_heavy_metal` varchar(255) DEFAULT NULL,
  `report_microbial_safety` varchar(255) DEFAULT NULL,
  `report_protein_percentage` varchar(255) DEFAULT NULL,
  `report_test_details` text,
  PRIMARY KEY (`id`),
  KEY `FKs6cydsualtsrprvlf2bb3lcam` (`brand_id`),
  KEY `FKd9gfnsjgfwjtaxl57udrbocsp` (`sub_category_id`),
  CONSTRAINT `FKd9gfnsjgfwjtaxl57udrbocsp` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_category` (`id`),
  CONSTRAINT `FKs6cydsualtsrprvlf2bb3lcam` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'2026-05-31 22:45:01.524261','Test Description','https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=1200&auto=format&fit=crop',_binary '\0','Elite Whey Isolate Updated','2026-05-31 22:45:01.524261',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'2026-05-31 22:45:01.524261','High calorie lean bulk formula with whey blend, complex carbs, and creatine support.','https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop',_binary '\0','Mass Forge Gainer','2026-05-31 22:45:01.524261',NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'2026-05-31 22:45:01.524261','Micronized creatine monohydrate for strength, power output, and muscle cell hydration.','https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop',_binary '\0','Creatine Monohydrate Pro','2026-06-20 12:11:13.305002',2,NULL,NULL,NULL,_binary '',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'2026-05-31 22:45:01.524261','High-intensity pump, energy, and focus blend for serious training sessions.','https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=1200&auto=format&fit=crop',_binary '','Rage Pre Workout','2026-06-20 12:10:35.122978',3,4,NULL,NULL,_binary '',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'2026-05-31 22:45:01.524261','Cutting support formula for active fat metabolism and daily energy.','https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1200&auto=format&fit=crop',_binary '','Lean Burn L-Carnitine','2026-06-20 12:14:51.881406',4,4,'[\"Accelerates muscle protein synthesis\",\"Reduces muscle soreness and fatigue\",\"Mixes instantly with no clumps\",\"Zero artificial colors or dyes\",\"Enhanced with digestive enzymes\",\"Incredible, award-winning tast\"]','{\"servingSize\":\"10ml\",\"ingredients\":\"L-Carnitine, Green tea extract, B vitamins\",\"facts\":[{\"label\":\"protein\",\"value\":\"10g\"},{\"label\":\"carbs\",\"value\":\"2g\"},{\"label\":\"calories\",\"value\":\"15 kcal\"}]}',_binary '',_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL),(6,'2026-06-20 09:20:35.118926','BigMuscles Premium Gold Whey Protein is the pinnacle of All Natural & superior protein supplementation. Meticulously crafted with precision and care, our product stands as the best whey protein supplement, with the blend of world\'s finest whey protein concentrate and whey protein isolate ensuring unparalleled and superior absorption. \r\n\r\n\r\nAt the core of Premium Gold Whey Protein is a dedication to quality and efficacy. Each 35-gram serving delivers 25 grams of high-quality protein, ideal for muscle growth and recovery. Formulated for athletes, bodybuilders, fitness enthusiasts, and people who want to complete their daily protein requirements, Premium Gold Whey Protein caters to individuals seeking peak performance and physique sculpting. \r\n\r\n\r\n\r\nWe understand the body\'s need for essential nutrients, especially during intense physical activity. That\'s why we\'ve formulated Premium Gold Whey Protein to be a reliable source of premium-grade protein. It\'s the ultimate choice for those who focus on quality and effectiveness in their protein supplementation. Choose Premium Gold Whey Protein today to power your full potential with BigMuscles Nutrition. \r\n\r\n','/uploads/products/1781952380136_Screenshot 2026-06-20 at 2.20.01 PM.jpg',_binary '','Premium Gold Whey Protein','2026-06-21 07:23:25.672175',4,5,'{\"isRichDetails\":true,\"subTitle\":\"Recovery - Performance - Endurance\",\"advantage\":{\"subheading\":\"25g High-Quality Protein per Serving\",\"points\":[\"Prohydrolase Enzyme for Superior Digestibility\",\"Delicious Flavours\",\"Free from Cheap Amino Acids and Artificial flavours\"],\"tagline\":\"11g EAAs and Zero Sugar\"},\"whyChoose\":[{\"title\":\"24 gm High Quality Protein\",\"description\":\"Feaature Description\"}],\"benefits\":[{\"title\":\"Suuports Lean Muscles\",\"description\":\"Benefit Description\"}],\"formula\":{\"serving\":\"Per 45 gm Serving\",\"points\":[]},\"madeFor\":{\"points\":[],\"footer\":\"If you train consistently and demanding\"},\"howToUse\":{\"points\":[\"Consume post-workout or anytime you need a protein boost\"],\"footer\":\"Mix one scoop with 200–300 ml of cold water or milk\"},\"ingredientsText\":\"Amino spiking\\nPreservatives\\nArtificial flavours\\nGluten & soy\\nArtificial sweeteners\\nGMO\\nSugar\",\"freeFrom\":[\"Amino spiking\",\"  Preservatives\",\"  Artificial flavours\",\"  Gluten & soy\",\"  Artificial sweeteners\",\"  GMO \",\" Sugar\"],\"manufacturer\":{\"name\":\"BIGMUSCLES NUTRITION PRIVATE LIMITED\",\"address\":\"Plot No. 23, Sector 27C, Faridabad, Haryana, 121003\",\"contact\":\"support@muscleyn.com\",\"fssai\":\"1082399900199\"}}','{\"servingSize\":\"1 Scoop\",\"ingredients\":\"Micellar casein, Magnesium, Cocoa\",\"facts\":[{\"label\":\"Protein\",\"value\":\"25 gm\"},{\"label\":\"Carbs\",\"value\":\"4 gm\"},{\"label\":\"Fat\",\"value\":\"0\"}]}',_binary '',_binary '','/uploads/products/1782026605671_Reports-_Zero_100_Whey_page-0001.pdf','Pass','Pass','Pass','Pass','[{\"label\":\"Protein Percentage\",\"result\":\"Pass\"},{\"label\":\"Heavy Metal\",\"result\":\"Pass\"},{\"label\":\"Amino Acid Profile\",\"result\":\"Pass\"},{\"label\":\"Microbial Safety\",\"result\":\"Pass\"}]');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_image` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) DEFAULT NULL,
  `sequence_number` int DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6oo0cvcdtb6qmwsga468uuukk` (`product_id`),
  CONSTRAINT `FK6oo0cvcdtb6qmwsga468uuukk` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (1,'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=1200&auto=format&fit=crop',1,1),(2,'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1200&auto=format&fit=crop',2,1),(3,'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop',1,2),(4,'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop',1,3),(5,'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=1200&auto=format&fit=crop',1,4),(6,'https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1200&auto=format&fit=crop',1,5),(9,'/uploads/products/1781947235345_Screenshot 2026-06-20 at 2.19.35 PM.jpg',0,6),(10,'/uploads/products/1781947235372_Screenshot 2026-06-20 at 2.19.43 PM.jpg',0,6),(11,'/uploads/products/1781947235386_Screenshot 2026-06-20 at 2.19.52 PM.jpg',0,6),(12,'/uploads/products/1781947235406_Screenshot 2026-06-20 at 2.20.01 PM.jpg',0,6);
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_variant`
--

DROP TABLE IF EXISTS `product_variant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_variant` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `color` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `discount_percent` decimal(38,2) DEFAULT NULL,
  `flavor` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `old_price` decimal(38,2) DEFAULT NULL,
  `price` decimal(38,2) NOT NULL,
  `size` varchar(255) DEFAULT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `variant_name` varchar(255) NOT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgrbbs9t374m9gg43l6tq1xwdj` (`product_id`),
  CONSTRAINT `FKgrbbs9t374m9gg43l6tq1xwdj` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_variant`
--

LOCK TABLES `product_variant` WRITE;
/*!40000 ALTER TABLE `product_variant` DISABLE KEYS */;
INSERT INTO `product_variant` VALUES (1,NULL,'2026-05-31 22:45:01.524261',NULL,NULL,'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=1200&auto=format&fit=crop',_binary '',NULL,2499.00,NULL,NULL,15,'2026-05-31 22:45:01.524261','Default',NULL,1),(2,NULL,'2026-05-31 22:45:01.524261',26.00,'Vanilla','https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=1200&auto=format&fit=crop',_binary '',3499.00,2599.00,'2 kg','MUS-WHEY-VAN-2KG',29,'2026-05-31 22:45:01.524261','Vanilla 2 kg','2 kg',1),(3,NULL,'2026-05-31 22:45:01.524261',23.00,'Chocolate','https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop',_binary '',4299.00,3299.00,'3 kg','MUS-GAIN-CHOC-3KG',22,'2026-05-31 22:45:01.524261','Chocolate 3 kg','3 kg',2),(4,NULL,'2026-05-31 22:45:01.524261',25.00,'Unflavoured','https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop',_binary '',1999.00,1499.00,'250 g','MUS-CREA-UNF-250G',64,'2026-05-31 22:45:01.524261','Unflavoured 250 g','250 g',3),(5,NULL,'2026-05-31 22:45:01.524261',26.00,'Fruit Punch','https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=1200&auto=format&fit=crop',_binary '',2699.00,1999.00,'300 g','MUS-PRE-FP-300G',28,'2026-05-31 22:45:01.524261','Fruit Punch 300 g','300 g',4),(6,NULL,'2026-05-31 22:45:01.524261',NULL,NULL,'https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1200&auto=format&fit=crop',_binary '',1699.00,1099.00,NULL,NULL,33,'2026-05-31 22:45:01.524261','Default',NULL,5),(7,NULL,'2026-06-14 17:51:05.212542',30.00,'Chocolate','https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=1200&auto=format&fit=crop',_binary '',3499.00,2499.00,'2 kg','MUS-WHEY-CHOC-2KG',40,'2026-06-14 17:51:05.212542','Chocolate 2 kg','2 kg',1),(8,NULL,'2026-06-14 17:51:05.212542',29.00,'Green Apple','https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1200&auto=format&fit=crop',_binary '',1699.00,1199.00,'500 ml','MUS-CUT-GA-500ML',35,'2026-06-14 17:51:05.212542','Green Apple 500 ml','500 ml',5),(9,NULL,'2026-06-20 09:35:51.024036',NULL,NULL,NULL,_binary '',3499.00,2499.00,NULL,NULL,9,'2026-06-20 09:35:51.024041','Default',NULL,6);
/*!40000 ALTER TABLE `product_variant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `rating` double DEFAULT NULL,
  `review_text` longtext,
  `user_id` bigint DEFAULT NULL,
  `is_verified_buyer` bit(1) DEFAULT NULL,
  `media_urls` text,
  `appear_in_dashboard` bit(1) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (2,'2026-06-20 10:03:36.749520',6,4,'Very Good',1,_binary '','',NULL,NULL,NULL),(3,'2026-06-20 17:06:49.507708',6,5,'Gooooood',3,_binary '','/uploads/products/9f0245b1-1038-4abd-984d-79d67b0c04de_download.jpeg',_binary '\0','abcd@gmail.com','John Doe');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_category`
--

DROP TABLE IF EXISTS `sub_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKepfe2w8qif1l2rqrrxiaep10` (`slug`),
  KEY `FKl65dyy5me2ypoyj8ou1hnt64e` (`category_id`),
  CONSTRAINT `FKl65dyy5me2ypoyj8ou1hnt64e` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_category`
--

LOCK TABLES `sub_category` WRITE;
/*!40000 ALTER TABLE `sub_category` DISABLE KEYS */;
INSERT INTO `sub_category` VALUES (1,'2026-05-31 22:45:01.524261','https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=1200&auto=format&fit=crop',_binary '','Whey Protein','whey-protein','2026-06-14 17:51:05.212542',NULL),(2,'2026-05-31 22:45:01.524261','https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop',_binary '','Mass Gainer','mass-gainer','2026-06-14 17:51:05.212542',NULL),(4,'2026-05-31 22:45:01.524261','https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=1200&auto=format&fit=crop',_binary '','Pre Workout','pre-workout','2026-06-14 17:51:05.212542',2),(5,'2026-05-31 22:45:01.524261','https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1200&auto=format&fit=crop',_binary '','Fat Burner','fat-burner','2026-06-14 17:51:05.212542',3);
/*!40000 ALTER TABLE `sub_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_address`
--

DROP TABLE IF EXISTS `user_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_address` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address_line1` varchar(255) DEFAULT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `address_type` enum('HOME','OFFICE','OTHER') DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `is_active` bit(1) NOT NULL,
  `is_default` bit(1) NOT NULL,
  `landmark` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_address`
--

LOCK TABLES `user_address` WRITE;
/*!40000 ALTER TABLE `user_address` DISABLE KEYS */;
INSERT INTO `user_address` VALUES (1,'123 Fitness St','Address Line 2','OFFICE','Mumbai','India','2026-06-14 11:21:56.869000','John Doe',_binary '',_binary '','Landmark','9876543210','400001','Maharashtra','2026-06-14 11:21:56.869000',1),(2,'Abcd','Line 2','HOME','City','India','2026-06-20 17:05:12.707000','John Doe',_binary '',_binary '','Landmark','1234567890','123456','Arunachal Pradesh','2026-06-20 17:05:12.707000',3);
/*!40000 ALTER TABLE `user_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `mobile_number` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('ROLE_ADMIN','ROLE_USER') DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKr7c96a004bv8w16jgdm8imich` (`mobile_number`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2026-05-31 22:44:55.976937','admin@muscleyn.local',_binary '','9999999999','Muscleyn Admin','$2a$10$b9dcnGp0NR2/qcPL4.u2r.wpFV3P/hFJUlkV6atjS6C3rbCAf2FRi','ROLE_ADMIN','2026-06-14 17:51:29.373348'),(3,'2026-06-20 17:04:19.622996',NULL,_binary '','1234567890','John Doe','$2a$10$wAtBrmi487vUoRuB5qVC2uL50ULA3hKn7mppLN/j3BoQrCzkAq6Cy','ROLE_USER','2026-06-20 17:04:19.623005');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `variant_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6v2qlg7jgjc2ohutgnwyuy58p` (`variant_id`),
  CONSTRAINT `FK6v2qlg7jgjc2ohutgnwyuy58p` FOREIGN KEY (`variant_id`) REFERENCES `product_variant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-21 14:57:49
