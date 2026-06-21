export const LAB_CERTIFICATES_CMS_KEY = "protein-lab-certificates";

export interface LabCertificate {
  id: string;
  productName: string;
  imageUrl: string;
  reportUrl: string;
  batchNo?: string;
  proteinClaim?: string;
  testDate?: string;
}

export const slugifyCertificateName = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const createCertificateId = (productName: string) =>
  `${slugifyCertificateName(productName)}-${Date.now().toString(36)}`;

export const sampleLabCertificates: LabCertificate[] = [
  {
    id: "premium-gold-whey-protein",
    productName: "Premium Gold Whey Protein",
    imageUrl:
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=900&auto=format&fit=crop",
    reportUrl: "",
    batchNo: "BM-GOLD-25",
    proteinClaim: "25G Protein",
    testDate: "June 2026",
  },
  {
    id: "nitric-whey-protein",
    productName: "Nitric Whey Protein",
    imageUrl:
      "https://images.unsplash.com/photo-1622484212850-eb596d769edc?q=80&w=900&auto=format&fit=crop",
    reportUrl: "",
    batchNo: "BM-NITRIC-27",
    proteinClaim: "27G Protein",
    testDate: "June 2026",
  },
  {
    id: "zero-whey-protein",
    productName: "Zero Whey Protein",
    imageUrl:
      "https://images.unsplash.com/photo-1612532275214-e4ca76d0e4d1?q=80&w=900&auto=format&fit=crop",
    reportUrl: "",
    batchNo: "BM-ZERO-29",
    proteinClaim: "29G Protein",
    testDate: "June 2026",
  },
  {
    id: "whey-isolate",
    productName: "Whey Isolate",
    imageUrl:
      "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?q=80&w=900&auto=format&fit=crop",
    reportUrl: "",
    batchNo: "BM-ISO-32",
    proteinClaim: "32G Protein",
    testDate: "June 2026",
  },
];

export const parseLabCertificates = (cmsValue?: string | null) => {
  if (!cmsValue) {
    return sampleLabCertificates;
  }

  try {
    const parsed = JSON.parse(cmsValue);
    if (!Array.isArray(parsed)) {
      return sampleLabCertificates;
    }

    const certificates = parsed.filter(
      (item): item is LabCertificate =>
        typeof item?.id === "string" &&
        typeof item?.productName === "string" &&
        typeof item?.imageUrl === "string" &&
        typeof item?.reportUrl === "string"
    );

    return certificates.length > 0 ? certificates : sampleLabCertificates;
  } catch {
    return sampleLabCertificates;
  }
};
