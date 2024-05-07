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
    <select v-model="selectedDong">
      <option disabled value="">기본순</option>
      <option v-for="(dong, code) in sortData" :key="code" :value="code">
        {{ dong }}
      </option>
    </select>
    <div v-if="error">에러: {{ error }}</div>
    <!-- <ul v-if="realEstates.length > 0">
      <li v-for="(item, index) in realEstates" :key="index">
        {{ item.법정동 }}: {{ item.거래금액 }}만원 - {{ item.아파트 }}
      </li>
    </ul>
    <div v-else>데이터 로딩 중...</div> -->
    <table class="custom-table">
      <thead>
        <tr>
          <th>거래일자</th>
          <th>아파트명</th>
          <th>주소명</th>
          <th>면적</th>
          <th>건축일수</th>
          <th>층</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData" :key="index">
          <td>{{ item.date }}</td>
          <td>{{ item.apartmentName }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.area }}</td>
          <td>{{ item.constructionDays }}</td>
          <td>{{ item.floor }}</td>
        </tr>
      </tbody>
    </table>
    >
  </div>
</template>
<style scoped>
.custom-table {
  width: 100%;
  font-size: 1.5rem;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

.custom-table th {
  background-color: #f2f2f2;
}

.custom-table th:nth-child(1),
.custom-table td:nth-child(1) {
  width: 20%;
}
.custom-table th:nth-child(2),
.custom-table td:nth-child(2) {
  width: 20%;
}
.custom-table th:nth-child(3),
.custom-table td:nth-child(3) {
  width: 20%;
}
.custom-table th:nth-child(4),
.custom-table td:nth-child(4) {
  width: 10%;
}
.custom-table th:nth-child(5),
.custom-table td:nth-child(5) {
  width: 20%;
}
.custom-table th:nth-child(6),
.custom-table td:nth-child(6) {
  width: 10%;
}

.custom-table th:nth-child(1),
.custom-table th:nth-child(2),
.custom-table th:nth-child(3),
.custom-table th:nth-child(4),
.custom-table th:nth-child(5),
.custom-table th:nth-child(6) {
  text-align: center;
}
</style>
<script>
import axios from 'axios'
import { ref } from 'vue'
export default {
  name: 'RealEstateList',
  data() {
    return {
      realEstates: [],
      error: null,
      selectedDong: '',
      selectedSort: '', // 정렬 기준 선택
      lawDongs: {
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
      },
      sortData: {
        거래일자순:"거래일자순", 아파트명순: "아파트명순", 주소명순: "주소명순", 면적순:"면적순", 건축일수순: "건축일수순", 층순: "층순"
      }
    }
  },
  methods: {
    async fetchData() {
      if (!this.selectedDong) return;
      try {
        const response = await axios.get(`http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade`, {
          params: {
            LAWD_CD: this.selectedDong,
            DEAL_YMD: '202012',
            serviceKey: '서비스키'
          }
        });
        this.realEstates = response.data.response.body.item;
        this.sortRealEstates(); // 데이터를 가져온 후 정렬
      } catch (e) {
        this.error = e.toString();
      }
    },
    sortRealEstates() {
      // selectedSort에 따라 realEstates 정렬 로직 추가
    }
  }

}
</script>
