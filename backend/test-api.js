const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';

async function testAPI() {
  console.log('Testing API endpoints...\n');

  try {
    // Test GET /api/articles
    console.log('1. Testing GET /api/articles...');
    const articlesResponse = await axios.get(`${API_BASE_URL}/articles`);
    console.log(`   ✓ Status: ${articlesResponse.status}`);
    console.log(`   ✓ Articles count: ${articlesResponse.data.length}`);
    console.log(`   ✓ Response: ${JSON.stringify(articlesResponse.data.slice(0, 2), null, 2)}`);
    console.log('   ✓ GET /api/articles passed\n');
  } catch (error) {
    console.log(`   ✗ GET /api/articles failed: ${error.message}`);
    console.log('   ✗ GET /api/articles failed\n');
  }

  try {
    // Test GET /api/memories
    console.log('2. Testing GET /api/memories...');
    const memoriesResponse = await axios.get(`${API_BASE_URL}/memories`);
    console.log(`   ✓ Status: ${memoriesResponse.status}`);
    console.log(`   ✓ Memories count: ${memoriesResponse.data.length}`);
    console.log(`   ✓ Response: ${JSON.stringify(memoriesResponse.data.slice(0, 2), null, 2)}`);
    console.log('   ✓ GET /api/memories passed\n');
  } catch (error) {
    console.log(`   ✗ GET /api/memories failed: ${error.message}`);
    console.log('   ✗ GET /api/memories failed\n');
  }

  try {
    // Test GET /api/self-talkings
    console.log('3. Testing GET /api/self-talkings...');
    const selfTalkingsResponse = await axios.get(`${API_BASE_URL}/self-talkings`);
    console.log(`   ✓ Status: ${selfTalkingsResponse.status}`);
    console.log(`   ✓ Self-talkings count: ${selfTalkingsResponse.data.length}`);
    console.log(`   ✓ Response: ${JSON.stringify(selfTalkingsResponse.data.slice(0, 2), null, 2)}`);
    console.log('   ✓ GET /api/self-talkings passed\n');
  } catch (error) {
    console.log(`   ✗ GET /api/self-talkings failed: ${error.message}`);
    console.log('   ✗ GET /api/self-talkings failed\n');
  }

  console.log('API testing completed!');
}

testAPI();