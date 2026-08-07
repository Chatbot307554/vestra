import { USE_MOCK_API, apiClient } from './apiClient';
import { mockRecommendationGroups, getRecommendationsByType, getRecommendationsByPlacement } from '../mocks/recommendations';
import { mockRequest } from '../mocks/mockDatabase';
import type { RecommendationGroup } from '../types';

export async function getRecommendations(type: string): Promise<RecommendationGroup | null> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 350));
    return getRecommendationsByType(type) || null;
  }
  const response = await apiClient.get(`/recommendations/${type}`);
  return response.data;
}

export async function getRecommendationsByPage(placement: string): Promise<RecommendationGroup[]> {
  if (USE_MOCK_API) return mockRequest(getRecommendationsByPlacement(placement));
  const response = await apiClient.get(`/recommendations?placement=${placement}`);
  return response.data;
}

export async function getAllRecommendationGroups(): Promise<RecommendationGroup[]> {
  if (USE_MOCK_API) return mockRequest(mockRecommendationGroups);
  const response = await apiClient.get('/recommendations');
  return response.data;
}
