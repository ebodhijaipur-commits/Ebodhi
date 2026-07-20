const { FULLSTACK_LMS_CHAPTERS, LMS_CONTENT_VERSION: FS_V } = require('./fullstackLms');
const { DATA_SCIENCE_LMS_CHAPTERS, LMS_CONTENT_VERSION: DS_V } = require('./dataScienceLms');
const { DIGITAL_MARKETING_LMS_CHAPTERS, LMS_CONTENT_VERSION: DM_V } = require('./digitalMarketingLms');
const { DATA_ANALYTICS_LMS_CHAPTERS, LMS_CONTENT_VERSION: DA_V } = require('./dataAnalyticsLms');
const { APP_DEV_LMS_CHAPTERS, LMS_CONTENT_VERSION: AD_V } = require('./appDevelopmentLms');

const LMS_BY_SLUG = {
  'full-stack-development': { chapters: FULLSTACK_LMS_CHAPTERS, version: FS_V },
  'data-science-with-ai-ml': { chapters: DATA_SCIENCE_LMS_CHAPTERS, version: DS_V },
  'digital-marketing': { chapters: DIGITAL_MARKETING_LMS_CHAPTERS, version: DM_V },
  'data-analytics': { chapters: DATA_ANALYTICS_LMS_CHAPTERS, version: DA_V },
  'app-development-android-ios': { chapters: APP_DEV_LMS_CHAPTERS, version: AD_V }
};

module.exports = { LMS_BY_SLUG };
