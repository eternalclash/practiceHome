<template>
  <div>
    <h1>서울시 법정동 아파트 거래 내역</h1>
    <select v-model="selectedDong">
      <option disabled value="">지역을 선택하세요</option>
      <option v-for="(dong, code) in lawDongs" :key="code" :value="code">
        {{ dong }}
      </option>
    </select>
    <button @click="fetchData">데이터 불러오기</button>
    <div v-if="error">에러: {{ error }}</div>
    <ul v-if="realEstates.length > 0">
      <li v-for="(item, index) in realEstates" :key="index">
        {{ item.법정동 }}: {{ item.거래금액 }}만원 - {{ item.아파트 }}
      </li>
    </ul>
    <div v-else>데이터 로딩 중...</div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'

export default {
  name: 'RealEstateList',
  setup() {
    const realEstates = ref([])
    const error = ref(null)
    const selectedDong = ref('')
    const lawDongs = ref({
      11110: '종로구',
      11140: '중구',
      11170: '용산구',
      11200: '성동구',
      11215: '광진구',
      11230: '동대문구',
      11260: '중랑구',
      11290: '성북구',
      11305: '강북구',
      11320: '도봉구',
      11350: '노원구',
      11380: '은평구',
      11410: '서대문구',
      11440: '마포구',
      11470: '양천구',
      11500: '강서구',
      11530: '구로구',
      11545: '금천구',
      11560: '영등포구',
      11590: '동작구',
      11620: '관악구',
      11650: '서초구',
      11680: '강남구',
      11710: '송파구',
      11740: '강동구'
    })
    const apiClient = axios.create({
      baseURL: 'http://openapi.molit.go.kr',
      proxy: {
        host: 'http://openapi.molit.go.kr:8081',
        port: 8081
      }
    })
    const fetchData = async () => {
      if (!selectedDong.value) return
      try {
        const response = await apiClient.get(
          '/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade',
          {
            params: {
              LAWD_CD: selectedDong.value,
              DEAL_YMD: '202012', // 원하는 년월 설정
              serviceKey:
                '2vOx6mQondIDGDRAMyusDvjfN%2BhcsekpiHBTBTj%2FUmrpUJlbY8lzgcvMDcxwNjyutp1yWHqJjWr%2BhB1n6AD%2B%2Fg%3D%3D'
            }
          }
        )
        realEstates.value = response.data.response.body.item
      } catch (e) {
        error.value = e.toString()
      }
    }

    return { realEstates, error, selectedDong, lawDongs, fetchData }
  }
}
</script>
