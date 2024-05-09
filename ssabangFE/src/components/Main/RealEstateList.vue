<template>
  <div class="real-estate-list">
    <h1>서울시 법정동 및 구 아파트 거래 내역</h1>
    <div class="button-container">
      <button @click="showGuSearch" :class="{ active: currentView === 'guSearch' }">구 검색</button>
      <button @click="showDongSearch" :class="{ active: currentView === 'dongSearch' }">동 검색</button>
    </div>
    
    <div v-if="currentView === 'guSearch'" class="search-container">
      <div class="selection-area">
        <select v-model="selectedGu">
          <option disabled value="">구를 선택하세요</option>
          <option v-for="(gu, code) in guList" :key="code" :value="gu">{{ gu }}</option>
        </select>

        <input type="date" v-model="selectedStartDate" placeholder="시작 날짜 선택" :min="'2022-01-01'" :max="maxDate" />
        <input type="date" v-model="selectedEndDate" placeholder="종료 날짜 선택" :min="'2022-01-01'" :max="maxDate" />

        <button @click="fetchGu" class="fetch-button">데이터 불러오기</button>
      </div>
    </div>

    <div v-if="currentView === 'dongSearch'" class="search-container">
      <div class="selection-area">
        <select v-model="selectedGuCode" @change="updateDongList">
          <option disabled value="">구를 선택하세요</option>
          <option v-for="(gu, code) in guList" :key="code" :value="code">{{ gu }}</option>
        </select>

        <select v-model="selectedDong">
          <option disabled value="">동을 선택하세요</option>
          <option v-for="(dong, code) in dongList" :key="code" :value="dong">{{ dong.dongName }}</option>
        </select>

        <input type="date" v-model="selectedStartDate" placeholder="시작 날짜 선택" :min="'2022-01-01'" :max="maxDate" />
        <input type="date" v-model="selectedEndDate" placeholder="종료 날짜 선택" :min="'2022-01-01'" :max="maxDate" />

        <button @click="fetchDong" class="fetch-button">데이터 불러오기</button>
      </div>
    </div>

    <div v-if="error" class="error-message">에러: {{ error }}</div>
    <table v-if="realEstates.length" class="custom-table">
      <thead>
        <tr>
          <th @click="sortTable('dealDate')">
            거래일자 <span v-html="sortIcon('dealDate')"></span>
          </th>
          <th @click="sortTable('apartmentName')">
            아파트명 <span v-html="sortIcon('apartmentName')"></span>
          </th>
          <th @click="sortTable('address')">주소명 <span v-html="sortIcon('address')"></span></th>
          <th @click="sortTable('area')">면적 <span v-html="sortIcon('area')"></span></th>
          <th @click="sortTable('buildYear')">
            건축년도 <span v-html="sortIcon('buildYear')"></span>
          </th>
          <th @click="sortTable('floor')">층 <span v-html="sortIcon('floor')"></span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in realEstates" :key="index">
          <td>{{ item.dealDate }}</td>
          <td>{{ item.apartmentName }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.area }}</td>
          <td>{{ item.buildYear }}</td>
          <td>{{ item.floor }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else class="loading-message">데이터 로딩 중 또는 데이터 없음...</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getDongPeriod, getGuPeriod, getDongName } from '@/api/houseDealAPI'

export default {
  name: 'RealEstateList',
  data() {
    return {
      realEstates: [],
      error: null,
      selectedDong: '',
      selectedGu: '',
      selectedGuCode: '',
      selectedStartDate: '',
      selectedEndDate: '',
      dongList: {},
      guList: {
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
      maxDate: new Date().toISOString().substr(0, 10),
      sortKey: '',
      sortOrder: 1,
      currentView: 'guSearch'
    }
  },
  methods: {
    showGuSearch() {
      this.currentView = 'guSearch'
    },
    showDongSearch() {
      this.currentView = 'dongSearch'
    },
    sortTable(key) {
      if (this.sortKey === key) {
        this.sortOrder = -this.sortOrder
      } else {
        this.sortKey = key
        this.sortOrder = 1
      }
      this.realEstates.sort((a, b) => {
        if (a[key] < b[key]) return -this.sortOrder
        if (a[key] > b[key]) return this.sortOrder
        return 0
      })
    },
    sortIcon(key) {
      if (this.sortKey === key) {
        return this.sortOrder === 1 ? '&#9650;' : '&#9660;' // Unicode characters for arrows
      }
      return ''
    },
    async fetchGu() {
      if (!this.selectedGu || !this.selectedStartDate || !this.selectedEndDate) {
        alert('모든 필드를 채워주세요.')
        return
      }
      this.realEstates = []
      const formattedStartDate = this.selectedStartDate.replaceAll('-', '')
      const formattedEndDate = this.selectedEndDate.replaceAll('-', '')
      try {
        const response = await getGuPeriod(this.selectedGu, formattedStartDate, formattedEndDate)
        this.realEstates = response
      } catch (error) {
        this.error = error.toString()
      }
    },
    async fetchDong() {
      if (
        !this.selectedGuCode ||
        !this.selectedStartDate ||
        !this.selectedEndDate ||
        !this.selectedDong
      ) {
        console.log(this.selectedGuCode)
        console.log(this.selectedStartDate)
        console.log(this.selectedEndDate)
        console.log(this.selectedDong)
        alert('모든 필드를 채워주세요.')
        return
      }
      this.realEstates = []
      const formattedStartDate = this.selectedStartDate.replaceAll('-', '')
      const formattedEndDate = this.selectedEndDate.replaceAll('-', '')
      try {
        const response = await getDongPeriod(
          this.selectedDong.dongName,
          formattedStartDate,
          formattedEndDate
        )
        this.realEstates = response
      } catch (error) {
        this.error = error.toString()
      }
    },
    async updateDongList() {
      if (!this.selectedGuCode) {
        alert('구를 선택해주세요.')
        return
      }
      try {
        const response = await getDongName(this.selectedGuCode) // 임의의 기간으로 동 리스트 요청
        console.log(response)
        this.dongList = response
      } catch (error) {
        this.error = error.toString()
      }
    }
  }
}
</script>

<style scoped>
.real-estate-list {
  padding: 20px;
}

.button-container {
  margin-bottom: 20px;
}

.button-container button {
  margin-right: 10px;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  border-radius: 5px; 
  transition: background-color 0.3s ease; 
}

.button-container button.active {
  background-color: #0056b3;
}

.button-container button:hover {
  background-color: #0056b3;
}

.search-container {
  margin-bottom: 20px;
}

.selection-area {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.selection-area select,
.selection-area input[type='date'] {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.error-message {
  color: red;
}

.loading-message {
  font-style: italic;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.custom-table th {
  background-color: #f9f9f9;
  cursor: pointer;
}

.custom-table th:hover {
  background-color: #e9e9e9;
}

.custom-table th,
.custom-table td {
  text-align: left;
}

.fetch-button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  border-radius: 5px; 
  transition: background-color 0.3s ease; 
}

.fetch-button:hover {
  background-color: #0056b3;
}

</style>
