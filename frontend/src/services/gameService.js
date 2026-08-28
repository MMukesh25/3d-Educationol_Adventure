import api from './api';

export const gameService = {
  // Child Profile
  getChildProfile: async () => {
    const response = await api.get('/child/me');
    return response.data;
  },

  updateAvatar: async (avatarData) => {
    const response = await api.put('/child/avatar', {
      avatarData: typeof avatarData === 'string' ? avatarData : JSON.stringify(avatarData),
    });
    return response.data;
  },

  // Worlds & Activities
  getWorlds: async () => {
    const response = await api.get('/worlds');
    return response.data;
  },

  getActivitiesByWorld: async (worldCode) => {
    const response = await api.get(`/activities/world/${worldCode}`);
    return response.data;
  },

  getActivityById: async (id) => {
    const response = await api.get(`/activities/${id}`);
    return response.data;
  },

  // Gameplay Attempt Submission
  submitAttempt: async (activityId, answers, timeSpentSeconds = 30) => {
    const response = await api.post('/game/attempt/submit', {
      activityId,
      answers,
      timeSpentSeconds,
    });
    return response.data;
  },

  // Shop & Rewards
  getShopRewards: async () => {
    const response = await api.get('/rewards/shop');
    return response.data;
  },

  purchaseReward: async (rewardId) => {
    const response = await api.post('/rewards/purchase', { rewardId });
    return response.data;
  },

  toggleEquipReward: async (childRewardId) => {
    const response = await api.post(`/rewards/equip/${childRewardId}`);
    return response.data;
  },

  // Achievements & Daily Quests
  getAchievements: async () => {
    const response = await api.get('/achievements');
    return response.data;
  },

  getDailyChallenges: async () => {
    const response = await api.get('/achievements/daily-challenges');
    return response.data;
  },

  // Parent Analytics
  getParentReport: async () => {
    const response = await api.get('/parent/report');
    return response.data;
  },

  // Admin Management
  getAdminStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  getAdminUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },
};

export default gameService;
