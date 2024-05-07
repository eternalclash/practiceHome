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
      <div style="display: flex; height: 3vh; justify-content: center; align-items: center">
        <div
          style="
            width: 100%;
            height: 3vh;
            margin: 0;
            border: 1px solid;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #5ea1ff;
            color: white;
          "
          id="search-input"
          placeholder="검색..."
          @keyup.enter="searchPlace"
        >
          아파트 찜목록 보기
        </div>
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
            @{{ deal.type }} - {{ deal.keyword }}
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
    </div>

    <div class="map-container">
      <div id="map" style="width: 100%; height: 100%"></div>
    </div>
    <div class="info-group" v-if="Object.keys(deal).length > 0">
      <div class="apt-title">
        {{ infomation.apartmentName }}
        <button v-if="infomation.isLiked == false" @click="addToFavorites" class="favorite-button">
          찜 하기
        </button>
        <button v-else class="notfavorite-button">찜 완료</button>
      </div>

      <div class="flex">
        <div
          class="apt-size clickStyle"
          :class="{ clicked: this.tempArea == -1 }"
          @click="changeArea(-1)"
        >
          전체
        </div>
        <div
          class="apt-size clickStyle"
          :class="{ clicked: this.tempArea == area }"
          @click="changeArea(area)"
          v-for="(area, index) in areas"
        >
          {{ area }}㎡
        </div>
      </div>
      <div>
        <div class="sise">싸방시세</div>
        <div class="mame">매매 {{ this.lowPrice }} ~ {{ this.highPrice }}</div>
        <div>평균 {{ this.avgPrice }}/3.3㎡</div>
      </div>

      <GoogleChart :data="chartData" :options="chartOptions" :type="chartType" />
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
        <div class="silgeorae">실거래가</div>
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
          <div class="silgeorae">학군정보</div>
          <div class="list-between">
            <div>학군</div>
            <div>거리</div>
          </div>
          <div class="list-between2" v-for="(s, index) in school" :key="index">
            <div>{{ s.name }}</div>
            <div class="column-left">
              <div class="price">{{ s.time }}</div>
<<<<<<< HEAD
              <div>거리 {{ s.distance }}km</div>
=======
              <div>거리 {{ s.distance}}km</div>
>>>>>>> 80dd603bc106a11874eb0fb8ce4fa3c23e56346a
            </div>
          </div>
        </div>

        <div>
          <div class="silgeorae">역세권정보</div>
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

        <div>
          <div class="silgeorae">병원정보</div>
          <div class="list-between">
            <div>병원</div>
            <div>거리</div>
          </div>
          <div class="list-between2">
            <div>싸방정신병원</div>
            <div class="column-left">
              <div class="price">도보 10분</div>
              <div>거리 3km</div>
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
import { postZzim, getZzim } from '@/api/zzimAPI'
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

      searchKeyword: '',
      deals: [],
      deal: {},

      lat: 37.566826,
      lng: 126.9786567,

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
        title: '실거래가(단위: 만원)',
        curveType: 'function',
        legend: { position: 'bottom' }
      },
      chartType: 'LineChart',
      markers: [],
      showSearchResults: false
    }
  },
  async mounted() {
    this.initMap()
    this.dongMarkers = await getDongMarker()
    this.guMarkers = await getGuMarker()
    this.updateMarkers()
  },
  components: {
    GoogleChart
  },
  methods: {
    async addToFavorites() {
      try {
        // Here we use 'apartmentName' assuming it is the unique identifier for the building

        await postZzim(this.infomation.apartmentName)
        alert('찜 목록에 추가되었습니다.')
      } catch (error) {
        console.error('Error adding to favorites:', error)
        alert('찜 추가 중 오류가 발생했습니다.')
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
    clearMarkers() {
      console.log('clear' + this.markers.map((e) => console.log(e)))
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
      <div class="overlay-text">${name}</div>
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
      console.log(this.subwayMarkers)
      console.log(this.schoolMarkers)
      if (this.map.getLevel() <= 4) {
        this.apartmentMarkers = await getApartmentMarker(this.lat, this.lng)
        const markersData = this.apartmentMarkers
        this.displayMarkers(markersData)
      } else {
        // 지도의 현재 레벨에 따라 적절한 API 호출
        const useDong = this.map.getLevel() < 7
        const markersData = useDong ? this.dongMarkers : this.guMarkers
        this.displayMarkers(markersData)
      }
      this.displayCategoryMarkers(this.subwayMarkers)
      this.displayCategoryMarkers(this.schoolMarkers)
    },

    async displayCategoryMarkers(markersData) {
      const markerSubway = '/src/assets/subway.png' // 마커 이미지 경로
      const markerSchool = '/src/assets/school.png'
      markersData.forEach((data) => {
        console.log('data' + data)
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

        // // 마커에 마우스오버 이벤트를 등록합니다
        // kakao.maps.event.addListener(marker, 'mouseover', () => {
        //   overlay.setMap(this.map)
        // })

        // // 마커에 마우스아웃 이벤트를 등록합니다
        // kakao.maps.event.addListener(marker, 'mouseout', () => {
        //   overlay.setMap(null)
        // })

        this.markers.push({ overlay })
      })
    },
    handelUpdateMarkers(event) {
      clearTimeout(this.inputTimer)
      this.inputTimer = setTimeout(() => {
        this.updateMarkers()
      }, 500)
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
        console.log(deal)
        if (deal.type == 'APARTMENT' || deal.apartmentName) {
          console.log('deal' + deal)
          this.infomation = await getApartmentData(deal?.keyword || deal?.apartmentName)
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

          for (let s of this.school) {
            console.log(s)
          }

          this.deal = deal

          this.tempYear = '-1'
          this.tempArea = '-1'

          this.drawChartSection()

          // 지도 중심을 업데이트하는 로직 추가
          if (this.map && this.infomation.latitude && this.infomation.longitude) {
            this.map.setCenter(
              new kakao.maps.LatLng(this.infomation.latitude, this.infomation.longitude)
            )
            this.map.setLevel(3)
            this.lat = this.infomation.latitude
            this.lng = this.infomation.longitude
            this.updateMarkers()
          }
        } else {
          this.infomation = await getDongData(deal.keyword)
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
      this.chartData = []

      let returnData = []
      if (this.tempYear == -1) {
        console.log('info' + this.infomation.allYear)
        for (let x of this.infomation.allYear) {
          console.log(x)
        }
        console.log(this.tempArea, '<<<<<<<<<<<<<')
        returnData = calculateYearlyAverage(this.infomation.allYear, this.tempArea)
        console.log(returnData)
        this.chartData = returnData[0]
        this.tempDeal = returnData[1]
      } else if (this.tempYear == 1) {
        returnData = calculateMonthlyAverage(this.infomation.oneYear, this.tempArea)
        this.chartData = returnData[0]
        this.tempDeal = returnData[1]
      } else if (this.tempYear == 3) {
        returnData = calculateYearlyAverage(this.infomation.threeYear, this.tempArea)
        this.chartData = returnData[0]
        this.tempDeal = returnData[1]
      }

      for (let info of this.tempDeal) {
        const dealAmountNumeric = info.dealAmount * 10000
        totalArea += Number(info.area)
        totalPrice += dealAmountNumeric
        if (high < dealAmountNumeric) high = dealAmountNumeric
        if (low > dealAmountNumeric) low = dealAmountNumeric
      }

      if (this.tempYear == -1) {
        this.chartData.unshift(['Month', '실거래가'])
      } else if (this.tempYear == 1) {
        this.chartData.unshift(['Month', '실거래가'])
      } else if (this.tempYear == 3) {
        this.chartData.unshift(['Month', '실거래가'])
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
        console.log(this.searchKeyword)
        if (this.searchKeyword.trim() !== '') {
          this.deals = await searchKeyword(this.searchKeyword)
          console.log(this.deals)
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

    // chartSection의 찜하기 버트 api호출
    async addToFavorites() {
      try {
        const response = await axios.get(`http://찜추가 api?aptCode=${this.deal.aptCode}`)
        console.log('서버 응답:', response.data)
      } catch (error) {
        console.error('요청 실패:', error)
      }
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
  max-height: 40vh;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
}

.deal-item {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
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
  height: 100% - 0.3px;
  border-top: 0.3px solid lightgray;
  /* overflow-y: scroll;  */
  overflow-x: hidden; /* 가로 스크롤바 없애기 */
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
  cursor: pointer;
  outline: none;
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
</style>
