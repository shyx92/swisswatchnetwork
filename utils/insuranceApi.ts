interface Applicant {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  smoking_status: string;
  health_class: string;
}

interface QuoteRequest {
  coverage_type: string;
  coverage_amount: number;
  term_length: number;
  applicant: Applicant;
}

interface QuoteResponse {
  quote_id: string;
  monthly_premium: number;
  annual_premium: number;
  coverage_details: {
    type: string;
    amount: number;
    term: number;
  };
  carrier_name: string;
  policy_features: string[];
}

export async function getInsuranceQuote(quoteData: QuoteRequest): Promise<QuoteResponse> {
  const response = await fetch('/api/insurance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quoteData),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch insurance quote');
  }

  return response.json();
}

export async function submitApplication(applicationData: any) {
  const response = await fetch('/api/insurance/apply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(applicationData),
  });

  if (!response.ok) {
    throw new Error('Failed to submit insurance application');
  }

  return response.json();
}

// Additional utility functions for policy management
export async function getPolicyDetails(policyId: string) {
  const response = await fetch(`/api/insurance/policy/${policyId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch policy details');
  }

  return response.json();
}

export async function updatePolicyDetails(policyId: string, updates: any) {
  const response = await fetch(`/api/insurance/policy/${policyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error('Failed to update policy details');
  }

  return response.json();
} 