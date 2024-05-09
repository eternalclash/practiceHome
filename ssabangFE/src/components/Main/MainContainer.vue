<template>
  <div class="main-container">
    <div
      style="
        position: absolute;
        top: 10px;
        left: 10px;
        width: 200px;
        z-index: 5;
        width: 25vw;
        background-color: transparent;
        height: auto;
        display: flex;
        flex-direction: column;
      "
    >
      <div
        style="
          display: flex;
          height: 5vh;
          justify-content: center;
          align-items: center;
          width: 100%;
        "
      >
        <input
          style="width: 100%; height: 3vh; font-size: 1rem"
          :value="searchKeyword"
          @input="handleInput"
          placeholder="동이름(역삼동),아파트이름으로 검색"
        />
      </div>

      <div
        v-if="showSearchResults"
        class="search-results"
        style="background-color: white; position: relative"
      >
        <div v-if="deals && deals.length > 0">
          <div
            v-for="(deal, index) in deals"
            :key="index"
            class="deal-item"
            @click="handleApartment(deal)"
          >
            <div>
              <img
              src="../../assets/apartment.png"
              v-if="deal.type == 'APARTMENT'"
              alt="Apartment Icon"
              style="width: 12px; height: 12px"
            />
            <img
              src="../../assets/click.png"
              v-if="deal.type == 'DONG'"
              alt="Apartment Icon"
              style="width: 12px; height: 12px"
            />
              {{ deal.keyword }} {{ deal.dongName ? '- ' + deal.dongName : '- 이동하기' }}
            </div>
          </div>
        </div>
        <div v-else>
          <div class="deal-item">검색결과가 존재하지 않습니다.</div>
        </div>
      </div>
      <!-- 닫기 상태일 때 버튼만 보여주기 -->
      <button class="close-button" @click="toggleSearchResults">
        {{ showSearchResults ? '▲' : '▼' }}
      </button>
      <div style="display: flex; flex-direction: column; width: 100%">
        <div
          style="
            height: 3vh;
            margin: 0;
            border: 1px solid;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #5ea1ff;
            color: white;
            cursor: pointer;
          "
          id="search-input"
          @click="toggleZzimResults"
        >
          아파트 찜목록 보기
        </div>
        <div
          v-if="showZzimResults"
          class="search-results"
          style="background-color: white; position: relative"
        >
          <div v-if="zzimList.length > 0">
            <div
              v-for="(deal, index) in zzimList"
              :key="index"
              class="deal-item"
              @click="handleApartment(deal)"
            >
              <div>
                <img
                  src="../../assets/apartment.png"
                  v-if="deal.type == 'APARTMENT'"
                  alt="Apartment Icon"
                  style="width: 100%; height: 12px"
                />
                <div>
                  {{ deal.buildingName }} {{ deal.dongName ? '- ' + deal.dongName : '- 동검색' }}
                </div>
              </div>

              <div style="cursor: pointer" @click="deleteZzim(deal.buildingName, deal.dongName)">
                X
              </div>
            </div>
          </div>
          <div v-else>
            <div class="deal-item">찜 목록이 비어 있습니다.</div>
          </div>
        </div>
      </div>
    </div>
    <div class="map-container">
      <div id="map" style="width: 100%; height: 100%"></div>
    </div>

    <div class="info-group" v-if="Object.keys(deal).length <= 0 && !this.topLoadingCheck && dongChangInfo.length == 0">
      <h2>로딩중 입니다.</h2>
    </div>

    <div class="info-group" v-if="Object.keys(deal).length <= 0 && this.topLoadingCheck && dongChangInfo.length == 0">
      <div class="top-box" v-for="(topList, index) in topLists" :key="index" >
        <h2 class="box-title">{{ topList.title }}</h2>
        <!-- <ol class="list-group">
          <li v-for="(item, i) in topList.items" :key="i" class="list-item">{{ `${item[0]} - ${item[1]}`}}</li>
        </ol> -->
        <GoogleChart :data="topList.chartData" :options="topList.chartOptions" :type="topList.chartType" style="width: 110%; height: 200px;"/>
      </div>
    </div>

    <div class="info-group" v-if="dongChangInfo.length != 0">
      <div class="dongChang-box">
        <h2 class="dongChang-title">
          <img
              src="../../assets/apartment.png"
              alt="Apartment Icon"
              style="width: 24px; height: 24px"
            />
            {{ dongChangInfo[0].dongName }} 아파트 리스트</h2>
          <ul class="dongChang-group">
            <li v-for="(item) in dongChangInfo" class="dongChang-item" @click="handleApartment(item)">{{ item.apartmentName }}</li>
          </ul>
      </div>
    </div>

    <div class="info-group" v-if="Object.keys(deal).length > 0 && dongChangInfo.length == 0">
      <div class="apt-title">
        {{ infomation.apartmentName }}
        <button
          v-if="zzimCheck == false"
          @click="addZzim(infomation.apartmentName, infomation.dongName)"
          class="favorite-button"
        >
          찜 하기
        </button>
        <button
          v-else
          class="notfavorite-button"
          @click="deleteZzim(infomation.apartmentName, infomation.dongName)"
        >
          찜 완료
        </button>
      </div>

      <div
        style="
          max-width: 100%;
          min-height: 60px;
          overflow-y: hidden;
          display: flex;
          overflow-x: auto;
        "
      >
        <div style="display: flex; min-height: 60px">
          <div
            style="
              flex-shrink: 0;
              min-width: 100px;
              padding: 10px;
              box-sizing: border-box;
              border: 2px solid #fafafb;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 1.1rem;
            "
            class="clickStyle"
            :class="{ clicked: this.tempArea == -1 }"
            @click="changeArea(-1)"
          >
            전체
          </div>
          <div
            style="
              flex-shrink: 0;
              min-width: 100px;
              padding: 10px;
              box-sizing: border-box;
              border: 2px solid #fafafb;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 1.1rem;
            "
            class="clickStyle"
            :class="{ clicked: this.tempArea == area }"
            @click="changeArea(area)"
            v-for="(area, index) in areas"
          >
            {{ area }}㎡
          </div>
        </div>
      </div>

      <div>
        <div class="sise">싸방시세</div>
        <div class="mame">매매 {{ this.lowPrice }} ~ {{ this.highPrice }}</div>
        <div>평균 {{ this.avgPrice }}/3.3㎡</div>
      </div>

      <GoogleChart :data="chartData" :options="chartOptions" :type="chartType" style="width: 110%; height: 200px;" />
      <div class="flex-center">
        <div
          class="date-container clickStyle"
          :class="{ clicked: this.tempYear == 1 }"
          @click="changeYear(1)"
        >
          최근1년
        </div>
        <div
          class="date-container clickStyle"
          :class="{ clicked: this.tempYear == 3 }"
          @click="changeYear(3)"
        >
          최근3년
        </div>
        <div
          class="date-container clickStyle"
          :class="{ clicked: this.tempYear == -1 }"
          @click="changeYear(-1)"
        >
          전체기간
        </div>
      </div>
      <div class="georae">
        <div class="silgeorae">
          <img
            src="../../assets/apartment.png"
            alt="Apartment Icon"
            style="width: 20px; height: 20px; margin-right: 1%"
          />
          <div>실거래가</div>
        </div>
        <div class="list-between">
          <div>계약일</div>
          <div>실거래정보</div>
        </div>
        <div>
          <div class="info-list">
            <div class="list-between2" v-for="(info, index) in tempDeal" :key="index">
              <div>{{ info.dealDate }}</div>
              <div class="column-left">
                <div class="price">매매가 {{ formatAmount(info.dealAmount) }}</div>
                <div>평수 {{ info.area }}㎡</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="convenience">
        <div>
          <div class="silgeorae">
            <img
              src="../../assets/school.png"
              alt="Apartment Icon"
              style="width: 20px; height: 20px; margin-right: 1%"
            />
            <div>학군정보</div>
          </div>
          <div class="list-between">
            <div>학군</div>
            <div>거리</div>
          </div>
          <div class="list-between2" v-for="(s, index) in school" :key="index">
            <div>{{ s.name }}</div>
            <div class="column-left">
              <div class="price">{{ s.time }}</div>
              <div>거리 {{ s.distance }}km</div>
            </div>
          </div>
        </div>

        <div>
          <div class="silgeorae">
            <img
              src="../../assets/subway.png"
              alt="Apartment Icon"
              style="width: 20px; height: 20px; margin-right: 1%"
            />
            <div>역세권정보</div>
          </div>
          <div class="list-between">
            <div>역</div>
            <div>거리</div>
          </div>
          <div class="list-between2">
            <div>{{ subway.name }} ({{ subway.line }})</div>
            <div class="column-left">
              <div class="price">도보 {{ subway.time }}</div>
              <div>거리 {{ subway.distance }}km</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleChart from './Chart'
import {
  searchKeyword,
  getApartmentData,
  getDongMarker,
  getGuMarker,
  getApartmentMarker,
  getDongData
} from '@/api/apartmentAPI'
import { getSubwayNear, getSubwayInRange } from '@/api/subwayAPI'
import { getSchoolNear, getSchoolInRange } from '@/api/schoolAPI'
import { formatToKoreanCurrency, parseDate, formatAmount } from '@/utills/calculate'
import { calculateMonthlyAverage } from './changSection'
import { calculateYearlyAverage } from './changSectionYear'
import { calculateHalfAverage } from './changSectionHalf'
import { postZzim, getZzim } from '@/api/zzimAPI'
import { takeException } from '@/api/exception'
export default {
  name: 'MainContainer',
  data() {
    return {
      map: null,
      marker: null,
      subwayMarkers: [],
      dongMarkers: [],
      guMarkers: [],
      apartmentMarkers: [],
      schoolMarkers: [],
      zzimList: [],
      searchKeyword: '',
      deals: [],
      deal: {},

      lat: 37.5124641,
      lng: 127.102543,

      infomation: {
        apartmentName: '',
        latitude: 37.5001,
        longitude: 127.0385,
        allYearMaxPrice: 0,
        allYearMinPrice: 0,
        oneYearMaxPrice: 0,
        oneYearMinPrice: 0,
        threeYearMaxPrice: 0,
        threeYearMinPrice: 0,
        areas: [],
        allYear: [],
        oneYear: [],
        threeYear: []
      },
      tempDeal: [], // 구간 deals
      tempYear: -1, // 구간 year
      tempArea: -1, // 구간 area

      school: [],
      subway: {},

      areas: [],
      highPrice: '',
      lowPrice: '',
      avgPrice: '',
      chartData: [
        ['Month', '실거래가'],
        ['2004-01', 100],
        ['2004-02', 120],
        ['2004-03', 130]
      ],
      chartOptions: {
        title: '실거래가(단위: 억원)',
        curveType: 'function',
        legend: { position: 'bottom' }
      },
      chartType: 'LineChart',
      markers: [],
      showSearchResults: false,
      showZzimResults: false,
      zzimCheck: false,
      topLoadingCheck: false,
      topLists: [
        {
          title: '서울 자치구별 비싼 집값 TOP5',
          items: [],
          chartData: [],
          chartOptions: {
            title: '(단위: 억원)',
            legend: { position: 'none' }
          },
          chartType: 'ColumnChart'
        },
        {
          title: '서울 자치구별 싼 집값 TOP5',
          items: [],
          chartData: [],
          chartOptions: {
            title: '(단위: 억원)',
            legend: { position: 'none' }
          },
          chartType: 'ColumnChart'
        },
        {
          title: '서울 법정동별 비싼 집값 TOP5',
          items: [],
          chartData: [],
          chartOptions: {
            title: '(단위: 억원)',
            legend: { position: 'none' }
          },
          chartType: 'ColumnChart'
        },
        {
          title: '서울 법정동별 싼 집값 TOP5',
          items: [],
          chartData: [],
          chartOptions: {
            title: '(단위: 억원)',
            legend: { position: 'none' }
          },
          chartType: 'ColumnChart'
        }
      ],
      dongChangInfo : []
    }
  },
  async mounted() {
    this.initMap()
    this.dongMarkers = await getDongMarker()
    this.guMarkers = await getGuMarker()
    this.updateMarkers()
    this.updateTopLists()
  },
  components: {
    GoogleChart
  },
  methods: {
    async addToFavorites() {
      try {
        // Here we use 'apartmentName' assuming it is the unique identifier for the building
        alert('찜 목록에 추가되었습니다.')
        await postZzim(this.infomation.apartmentName)
      } catch (error) {
        alert('찜 추가 중 오류가 발생했습니다.')
        console.error('Error adding to favorites:', error)
      }
    },
    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371 // 지구의 반경(km)
      const radLat1 = (lat1 * Math.PI) / 180 // 위도를 라디안으로 변환
      const radLat2 = (lat2 * Math.PI) / 180
      const deltaLat = radLat2 - radLat1
      const deltaLon = ((lon2 - lon1) * Math.PI) / 180

      const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distance = R * c

      return Math.round(distance * 100) / 100 // 소수점 둘째 자리까지 반올림
    },
    calculateTravelTime(distance, averageSpeed) {
      const time = distance / averageSpeed // 시간(시간 단위)
      const hours = Math.floor(time)
      const minutes = Math.round((time - hours) * 60)

      return hours > 0 ? `${hours}시간` + `${minutes}분` : `${minutes}분`
    },
    formatAmount,
    getSubwayMarker() {},
    toggleSearchResults() {
      this.showSearchResults = !this.showSearchResults // 검색 결과 창 표시 상태를 토글합니다.
    },
    closeSearchResults() {
      this.showSearchResults = false // 검색 결과 창을 숨깁니다.
    },
    openSearchResults() {
      this.showSearchResults = true // 검색 결과 창을 숨깁니다.
    },
    toggleZzimResults() {
      this.showZzimResults = !this.showZzimResults
      if (this.showZzimResults == true) this.getZzim() // Load the zzim list on component mount
    },
    clearMarkers() {
      this.markers.forEach((m) => {
        m.marker?.setMap(null)
        m.overlay?.setMap(null)
      })
      this.markers = []
    },
    async displayMarkers(markersData) {
      markersData.forEach((data) => {
        const position = new kakao.maps.LatLng(
          data?.lat || data?.latitude,
          data?.lng || data?.longitude
        )
        const name = data?.bjdong_nm || data?.sgg_nm || data?.apartmentName || data?.name // 조건에 따라 적절한 속성 이름 사용
        const formattedPrice =
          ((data.amount ? data.amount : data.averagePrice) / 10000).toFixed(2) + '억'
        formattedPrice == NaN ? data.line : formattedPrice
        // DOM 요소 직접 생성
        const overlayElement = document.createElement('div')
        overlayElement.className = 'overlay-info'
        overlayElement.innerHTML = `
      <div class="overlay-number">${name}</div>
      <div class="overlay-number">${formattedPrice}</div>
    `

        // 클릭 이벤트 리스너 직접 추가
        overlayElement.addEventListener('click', () => {
          this.handleApartment(data)
        })

        const overlay = new kakao.maps.CustomOverlay({
          map: this.map,
          position: position,
          content: overlayElement,
          yAnchor: 1
        })

        this.markers.push({ overlay })
      })
    },

    async updateMarkers() {
      this.clearMarkers() // 기존 마커 제거
      this.subwayMarkers = await getSubwayInRange(this.lat, this.lng)
      this.schoolMarkers = await getSchoolInRange(this.lat, this.lng)
      if (this.map.getLevel() <= 4) {
        this.apartmentMarkers = await getApartmentMarker(this.lat, this.lng)
        const markersData = this.apartmentMarkers
        this.displayMarkers(markersData)
        this.displayCategoryMarkers(this.subwayMarkers)
        this.displayCategoryMarkers(this.schoolMarkers)
      } else {
        // 지도의 현재 레벨에 따라 적절한 API 호출
        const useDong = this.map.getLevel() < 7
        const markersData = useDong ? this.dongMarkers : this.guMarkers
        this.displayMarkers(markersData)
      }
    },

    async displayCategoryMarkers(markersData) {
      const markerSubway = '/src/assets/subway.png' // 마커 이미지 경로
      const markerSchool = '/src/assets/school.png'
      markersData.forEach((data) => {
        const position = new kakao.maps.LatLng(
          data?.lat || data?.latitude,
          data?.lng || data?.longitude
        )

        const overlayElement = document.createElement('div')
        overlayElement.className = 'overlay-info2'
        overlayElement.innerHTML = `
        <img src="${data.line ? markerSubway : markerSchool}" alt="Subway Icon" style="width: 24px; height: 24px;">
      <div class="overlay-text">${data.name}</div>
      ${data.line ? `<div class="overlay-number">${data.line}</div>` : ''}
        `

        const overlay = new kakao.maps.CustomOverlay({
          content: overlayElement,
          map: this.map,
          position,
          yAnchor: 1,
          zIndex: 3
        })
        overlay.setMap(this.map) // Initially hide the overlay

        this.markers.push({ overlay })
      })
    },
    updateTopLists() {
      this.guMarkers.sort((a, b) => a.amount - b.amount);
      this.dongMarkers.sort((a, b) => a.amount - b.amount);

      // 비싼 구 5개
      this.topLists[0].items = this.guMarkers.slice(-5).map(marker => [marker.sgg_nm, parseFloat((marker.amount / 10000).toFixed(2))]).reverse();
      this.topLists[0].chartData = [['자치구', 'Amount'], ...this.topLists[0].items];

      // 싼 구 5개
      this.topLists[1].items = this.guMarkers.slice(0, 5).map(marker => [marker.sgg_nm, parseFloat((marker.amount / 10000).toFixed(2))]);
      this.topLists[1].chartData = [['자치구', 'Amount'], ...this.topLists[1].items];

      // 비싼 동 5개
      this.topLists[2].items = this.dongMarkers.slice(-5).map(marker => [marker.bjdong_nm, parseFloat((marker.amount / 10000).toFixed(2))]).reverse();
      this.topLists[2].chartData = [['법정동', 'Amount'], ...this.topLists[2].items];

      // 싼 동 5개
      this.topLists[3].items = this.dongMarkers.slice(0, 5).map(marker => [marker.bjdong_nm, parseFloat((marker.amount / 10000).toFixed(2))]);
      this.topLists[3].chartData = [['법정동', 'Amount'], ...this.topLists[3].items];
    
      this.topLoadingCheck = true;
    },

    handelUpdateMarkers(event) {
      clearTimeout(this.inputTimer)
      this.inputTimer = setTimeout(() => {
        this.updateMarkers()
      }, 300)
    },
    handleInput(event) {
      clearTimeout(this.inputTimer)
      const value = event.target.value
      this.inputTimer = setTimeout(() => {
        this.searchKeyword = value
        this.openSearchResults()
        this.fetchDealsData()
      }, 1000) // 디바운스 시간은 필요에 따라 조정
    },
    async handleApartment(deal) {
      try {
        this.dongChangInfo = []
        if (deal.type == 'APARTMENT' || deal.apartmentName || deal.buildingName) {
          this.infomation = await getApartmentData(
            deal?.keyword || deal?.apartmentName || deal?.buildingName,
            deal?.dongName
          )
          this.infomation.dongName = deal.dongName
          if (this.map && this.infomation.latitude && this.infomation.longitude) {
            this.map.setCenter(
              new kakao.maps.LatLng(this.infomation.latitude, this.infomation.longitude)
            )
            this.map.setLevel(3)
            this.lat = this.infomation.latitude
            this.lng = this.infomation.longitude
            this.updateMarkers()
          }
          console.log(this.infomation)
          this.infomation.isLiked = this.checkZzim(this.infomation.apartmentName)
          this.subway = await getSubwayNear(this.infomation.latitude, this.infomation.longitude)
          this.subway.distance = this.calculateDistance(
            this.infomation.latitude,
            this.infomation.longitude,
            this.subway.lat, 
            this.subway.lng
          )
          this.subway.time = this.calculateTravelTime(this.subway.distance, 4.8)
          this.school = await getSchoolNear(this.infomation.latitude, this.infomation.longitude)
          for (let s of this.school) {
            s.distance = this.calculateDistance(
              this.infomation.latitude,
              this.infomation.longitude,
              s.lat,
              s.lng
            )
            s.time = this.calculateTravelTime(s.distance, 4.8)
          }

          this.deal = deal

          this.tempYear = '-1'
          this.tempArea = '-1'
          this.drawChartSection()

          // 지도 중심을 업데이트하는 로직 추가
        } else {
          this.infomation = await getDongData(deal.keyword)
          this.dongChangInfo = this.infomation
          this.infomation.isLiked = this.checkZzim(this.infomation.apartmentName)
          this.displayApartmentMarkers(this.infomation)
        }
      } catch (e) {
        console.error('Error fetching apartment data:', e)
      }
    },

    drawChartSection() {
      let high = Number.MIN_SAFE_INTEGER
      let low = Number.MAX_SAFE_INTEGER
      let totalArea = 0
      let totalPrice = 0

      let returnData = []

      if (this.tempYear == -1) {
        if(this.infomation.allYear != undefined){
          returnData = calculateYearlyAverage(this.infomation.allYear, this.tempArea)
          if(returnData[1] != []) {
            this.chartData = returnData[0]
            this.tempDeal = returnData[1] 
            this.chartData.unshift(['Year', '실거래가'])
          } else{
            alert('해당 기간 거래정보가 없습니다.')
          }
        } else {
          alert('해당 기간 거래정보가 없습니다.')
        }
      } else if (this.tempYear == 1) {
        if(this.infomation.oneYear != undefined){
          returnData = calculateMonthlyAverage(this.infomation.oneYear, this.tempArea)
          if(returnData[1] != []) {
            this.chartData = returnData[0]
            this.tempDeal = returnData[1] 
            this.chartData.unshift(['Month', '실거래가'])
          } else {
            alert('해당 기간 거래정보가 없습니다.')
          }
        } else {
          alert('해당 기간 거래정보가 없습니다.')
        }
      } else if (this.tempYear == 3) {
        if(this.infomation.threeYear != undefined){
          returnData = calculateHalfAverage(this.infomation.threeYear, this.tempArea)
          if(returnData[1] != []) {
            console.log('returnData',returnData)
            this.chartData = returnData[0]
            this.tempDeal = returnData[1] 
            this.chartData.unshift(['Month', '실거래가'])
          } else{
            alert('해당 기간 거래정보가 없습니다.')
          }
        } else {
          alert('해당 기간 거래정보가 없습니다.')
        }
      }

      for (let info of this.tempDeal) {
        const dealAmountNumeric = info.dealAmount * 10000
        totalArea += Number(info.area)
        totalPrice += dealAmountNumeric
        if (high < dealAmountNumeric) high = dealAmountNumeric
        if (low > dealAmountNumeric) low = dealAmountNumeric
      }

      this.areas = Array.from(this.infomation.areas).sort((a, b) => a - b)
      this.avgPrice = formatToKoreanCurrency(Math.ceil((totalPrice / totalArea) * 3.3))

      this.highPrice = formatToKoreanCurrency(high)
      this.lowPrice = formatToKoreanCurrency(low)
    },

    changeArea(area) {
      this.tempArea = area
      this.drawChartSection()
    },
    changeYear(year) {
      this.tempYear = year
      this.drawChartSection()
    },

    displayApartmentMarkers(apartmentData) {
      this.clearMarkers()
      apartmentData.forEach((data, index) => {
        const position = new kakao.maps.LatLng(data.latitude, data.longitude)
        const formattedPrice = (data.averagePrice / 10000).toFixed(2) + '억'
        formattedPrice == NaN ? '' : formattedPrice
        const overlayElement = document.createElement('div')
        data.type = 'APARTMENT'
        data.keyword = data.apartmentName
        overlayElement.className = 'overlay-info'
        overlayElement.innerHTML = `
      <div class="overlay-text">${data.apartmentName}</div>
      <div class="overlay-number">${formattedPrice}</div>
    `
        const overlay = new kakao.maps.CustomOverlay({
          map: this.map,
          position: position,
          content: overlayElement,
          yAnchor: 2.3
        })

        overlayElement.addEventListener('click', () => {
          overlay.setZIndex(5)
          this.handleApartment(data)
        })

        this.markers.push({ overlay })

        overlay.setMap(this.map)

        // 첫 번째 마커에서 지도 중심을 이동
        if (index === 0) {
          this.map.setCenter(position)
          this.map.setLevel(3)
        }
      })
    },

    async fetchDealsData() {
      try {
        if (this.searchKeyword.trim() !== '') {
          this.deals = await searchKeyword(this.searchKeyword)
          this.deals.reverse()
        }
      } catch (error) {
        console.error('Error fetching deals:', error)
      }
    },

    initMap() {
      const mapContainer = document.getElementById('map')
      const mapOption = {
        center: new kakao.maps.LatLng(this.lat, this.lng),
        level: 3
      }

      this.map = new kakao.maps.Map(mapContainer, mapOption)

      kakao.maps.event.addListener(this.map, 'tilesloaded', () => {
        this.addEventListeners()
      })
    },
    addEventListeners() {
      kakao.maps.event.addListener(this.map, 'dragend', () => {
        const center = this.map.getCenter()
        this.lat = center.getLat()
        this.lng = center.getLng()
        this.clearMarkers()
        this.handelUpdateMarkers()
      })
      kakao.maps.event.addListener(this.map, 'zoom_changed', () => {
        const center = this.map.getCenter()
        this.lat = center.getLat()
        this.lng = center.getLng()
        this.clearMarkers()
        this.handelUpdateMarkers()
      })
    },
    async checkZzim(buildingName) {
      if (!localStorage.getItem('access')) {
        this.zzimCheck = false
        return false // 'access' 키가 localStorage에 없으면 false 반환
      }

      const zzimList = await getZzim()
      console.log(zzimList.some((z) => z.buildingName == buildingName))
      if (zzimList && Array.isArray(zzimList)) {
        console.log('S')
        this.zzimCheck = zzimList.some((z) => z.buildingName == buildingName)
        return
      }

      return false // zzimList가 배열이 아니거나 비어있으면 false 반환
    },
    async addZzim(buildingName, dongName) {
      if (!localStorage.getItem('access')) {
        takeException()
        return
      }

      await postZzim(buildingName, dongName)
      alert('찜 목록에 추가되었습니다.')
      this.zzimCheck = true
      await this.getZzim() // Update the zzim list displayed
    },

    async deleteZzim(buildingName, dongName) {
      let zzimList = await getZzim()

      if (zzimList && Array.isArray(zzimList)) {
        alert('삭제 완료했습니다.')
        this.zzimCheck = false
        await postZzim(buildingName, dongName)
        await this.getZzim()
      }
    },
    async getZzim() {
      const zzimList = await getZzim()
      console.log(zzimList)
      if (!localStorage.getItem('access')) {
        this.zzimList = []
        return
      }
      this.zzimList = Array.isArray(zzimList) ? zzimList : []
    }
  }
}
</script>
<style>
.overlay-info {
  background-color: #38b6ff;
  z-index: 2;
  overflow: visible !important;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -ms-border-radius: 3px;
  -o-border-radius: 3px;
  border-radius: 3px;
  padding: 0% 0.5vw;
  pointer-events: auto;
}
.overlay-info2 {
  background-color: white;
  z-index: 2;
  overflow: visible !important;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -ms-border-radius: 3px;
  -o-border-radius: 3px;
  border-radius: 3px;
  padding: 0% 0.5vw;
  pointer-events: auto;
}
.overlay-text {
  color: black;
  font-size: 11px;
  font-weight: normal;
  white-space: nowrap;
}
.overlay-number {
  color: black;
  font-size: 13px;
  font-weight: normal;
  white-space: nowrap;
}
</style>
<style scoped>
.search-results {
  max-height: 30vh;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
}

.deal-item {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

.input[type='text'] {
  box-shadow: none;

  border: none;
  padding-block: 0;
  padding-inline: 0;

  padding: 0;
  padding-block: none;
}
.price {
  font-weight: 700;
  font-size: 1rem;
}
.column-left {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.list-between2 {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 7vh;
  font-size: 0.8rem;
  border-bottom: 0.1px solid lightgray;
}
.list-between {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 5vh;
  font-size: 0.8rem;
  border-bottom: 0.1px solid lightgray;
}
.silgeorae {
  margin-top: 2vh;
  font-weight: 700;
  display: flex;
  align-items: center;
}
.flex-center {
  display: flex;
  justify-content: space-around;
  width: 100%;
  background-color: #ede8e8;
  align-items: center;
  height: 5vh;
  margin: 3vh 0;
}
.date-container {
  height: 4vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 5vw;
  margin: 1% 0;
}
.flex {
  display: flex;
  height: 6vh;
  align-items: center;
  width: 100%;
  border-bottom: 0.1px solid lightgray;
  border-radius: 1px;
}
.georae {
  display: flex;
  height: auto;

  border-top: 0.1px solid lightgray;
  border-radius: 1px;
  flex-direction: column;
}
.flex-column {
  display: flex;
  height: 6vh;
  align-items: center;
}
.sise {
  margin-top: 3vh;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1.2vh;
}
.mame {
  font-size: 1.5rem;
  font-weight: 700;
}
.apt-size {
  font-size: 1rem;
  width: 20%;
  text-align: center;
}
.main-container {
  display: flex;
  height: 90vh;
  position: relative;
  max-width: 100vw;
  overflow-x: hidden;
}

.map-container {
  width: 70%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

#map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.info-group {
  width: 30%; /* 여백 고려하여 계산 */
  max-height: 100% - 0.3px;
  border-top: 0.3px solid lightgray;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

.info-group > * {
  margin-left: 2%;
}

.apt-title {
  font-size: 2rem;
  text-align: center;
  margin-top: 2vh;
  padding-bottom: 2vh;
  border-bottom: 0.1px solid lightgray;
}
.apt-size {
  height: 5vh;
  width: 7vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.favorite-button {
  padding: 10px;
  font-size: 16px;
  background-color: #38b6ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
}
.notfavorite-button {
  padding: 10px;
  font-size: 16px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  border: 1px solid;
}
.georae .info-list {
  max-height: 200px;
  overflow-y: auto;
}

.clickStyle {
  cursor: pointer;
}

.clicked {
  background-color: #38b6ff;
}

.top-box {
  padding: 10px;
  border-radius: 10px;
}

.box-title {
  margin-bottom: 10px;
  text-align: center;
}

.dongChang-box {
  margin-left: 20px;
  margin-bottom: 20px;
}
.dongChang-title {
  font-size: 20px;
  margin-bottom: 10px;
}
.dongChang-item {
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  background-color: #f0f0f0;
  margin-right: 10px;
  margin-bottom: 5px;
  transition: background-color 0.3s;
}
.dongChang-item:hover {
  background-color: #e0e0e0;
}
</style>
