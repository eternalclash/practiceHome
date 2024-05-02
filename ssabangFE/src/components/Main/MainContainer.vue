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
        background-color: white;
        height: auto;
        box-shadow: 4px 4px 8px #aaa;
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
          border-bottom: 0.1px solid lightgray;
        "
      >
        <input
          :value="searchKeyword"
          @input="handleInput"
          placeholder="동이름,혹은 아파트이름으로 검색해주세요"
        />
      </div>
      <div style="display: flex; height: 5vh; justify-content: center; align-items: center">
        <div
          style="
            width: 70%;
            height: 70%;
            margin: 0;
            padding-left: 3%;
            border: 1px solid;
            display: flex;
            justify-content: center;
            align-items: center;
          "
          id="search-input"
          placeholder="검색..."
          @keyup.enter="searchPlace"
        >
          검색 조건을 설정해주세요.
        </div>
        <div
          style="
            width: 20%;
            height: 70%;
            border: 1px solid;
            justify-content: center;
            display: flex;
            align-items: center;
          "
        >
          필터
        </div>
      </div>
      <div class="search-results" v-if="deals && deals.length > 0">
        <div
          v-for="(deal, index) in deals"
          :key="index"
          class="deal-item"
          @click="handleApartment(deal)"
        >
          @{{ deal.type }} - {{ deal.keyword }}
        </div>
      </div>
    </div>

    <div class="map-container">
      <div id="map" style="width: 100%; height: 100%"></div>
    </div>
    <div class="info-group" v-if="Object.keys(deal).length > 0">
      <div class="apt-title">{{ deal.apartmentName }}</div>

      <div class="flex">
        <div class="apt-size">전체</div>
        <div class="apt-size" v-for="(area, index) in areas">{{ area }}㎡</div>
      </div>
      <div>
        <div class="sise">싸방시세</div>
        <div class="mame">매매 {{ this.lowPrice }} ~ {{ this.highPrice }}</div>
        <div>평균 {{ this.avgPrice }}/3.3㎡</div>
      </div>

      <GoogleChart :data="chartData" :options="chartOptions" :type="chartType" />
      <div class="flex-center">
        <div class="date-container">최근1년</div>
        <div class="date-container">최근3년</div>
        <div class="date-container">전체기간</div>
      </div>
      <div class="georae">
        <div class="silgeorae">실거래가</div>
        <div class="list-between">
          <div>계약일</div>
          <div>실거래정보</div>
        </div>
        <div>
          <div class="list-between2" v-for="(info, index) in infomation">
            <div>{{ info.dealDate }}</div>
            <div class="column-left">
              <div class="price">매매가 {{ info.dealAmount }}</div>
              <div>평수 {{ info.area }}㎡</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleChart from './Chart'
import { searchKeyword, getApartmentData, getDongMarker, getGuMarker } from '@/api/apartmentAPI'
import { formatToKoreanCurrency, parseDate } from '@/utills/calculate'
export default {
  name: 'MainContainer',
  data() {
    return {
      map: null,
      marker: null,
      searchKeyword: '',
      deals: [],
      deal: {},
      infomation: [],
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
        title: '실거래가',
        curveType: 'function',
        legend: { position: 'bottom' }
      },
      chartType: 'LineChart',
      markers: []
    }
  },
  mounted() {
    this.initMap()
    this.displayMarkers()
    kakao.maps.event.addListener(this.map, 'dragend', this.updateMarkers)
    kakao.maps.event.addListener(this.map, 'zoom_changed', this.updateMarkers)
  },
  components: {
    GoogleChart
  },
  methods: {
    async displayMarkers() {
      const markersData = await getDongMarker() // 마커 데이터를 로드하는 함수
      this.clearMarkers() // 기존 마커 제거

      markersData.forEach((data) => {
        const position = new kakao.maps.LatLng(data.lat, data.lng)

        const marker = new kakao.maps.Marker({
          map: this.map,
          position: position
        })

        const overlay = new kakao.maps.CustomOverlay({
          content: `<div class="overlay-info">
          <h4>${data.bjdong_nm}</h4>
          <p>평균가: ${data.amount}만원</p>
        </div>`,
          map: this.map,
          position: position,
          yAnchor: 1.2
        })

        this.markers.push({ marker, overlay })
      })
    },

    clearMarkers() {
      this.markers.forEach((m) => {
        m.marker.setMap(null)
        m.overlay.setMap(null)
      })
      this.markers = []
    },
    async updateMarkers() {
      this.clearMarkers() // 기존 마커 제거

      // 지도의 현재 레벨에 따라 적절한 API 호출
      const useDong = this.map.getLevel() < 6
      const markersData = useDong ? await getDongMarker() : await getGuMarker()
      console.log('Updated markers:', markersData)

      markersData.forEach((data) => {
        const position = new kakao.maps.LatLng(data.lat, data.lng)

        const marker = new kakao.maps.Marker({
          map: this.map,
          position: position
        })

        // 조건에 따라 적절한 속성 이름 사용
        const name = useDong ? data.bjdong_nm : data.sgg_nm
        const overlay = new kakao.maps.CustomOverlay({
          content: `<div class="overlay-info">
        <h4>${name}</h4>
        <p>평균가: ${data.amount}만원</p>
      </div>`,
          map: this.map,
          position: position,
          yAnchor: 1
        })

        this.markers.push({ marker, overlay })
      })
    },

    handleInput(event) {
      clearTimeout(this.inputTimer)
      const value = event.target.value
      this.inputTimer = setTimeout(() => {
        this.searchKeyword = value
        this.fetchDealsData()
      }, 300) // 디바운스 시간은 필요에 따라 조정
    },
    async handleApartment(deal) {
      try {
        if (deal.aptCode) {
          this.infomation = await getApartmentData(deal.aptCode)
        } else if (deal.dongCode) {
        }

        console.log(this.infomation)
        this.deal = deal
        let high = Number.MIN_SAFE_INTEGER
        let low = Number.MAX_SAFE_INTEGER
        let totalArea = 0
        let totalPrice = 0
        const tempArea = new Set()
        this.chartData = []
        for (let info of this.infomation) {
          const dealAmountNumeric = parseInt(info.dealAmount.replace(/,/g, ''), 10) * 10000
          tempArea.add(info.area)
          totalArea += Number(info.area)
          totalPrice += dealAmountNumeric
          info.dealAmount = formatToKoreanCurrency(dealAmountNumeric)
          this.chartData.push([parseDate(info.dealDate), dealAmountNumeric])
          if (high < dealAmountNumeric) high = dealAmountNumeric
          if (low > dealAmountNumeric) low = dealAmountNumeric
        }

        this.chartData.sort((a, b) => b[0] - a[0]).reverse()
        this.chartData.unshift(['Month', '실거래가'])
        this.areas = Array.from(tempArea).sort((a, b) => a - b)
        this.avgPrice = formatToKoreanCurrency(Math.ceil((totalPrice / totalArea) * 3.3))
        // 지도 중심을 업데이트하는 로직 추가
        if (this.map && deal.lat && deal.lng) {
          this.map.setCenter(new kakao.maps.LatLng(deal.lat, deal.lng))

          if (this.marker) {
            this.marker.setPosition(new kakao.maps.LatLng(deal.lat, deal.lng))
          } else {
            this.marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(deal.lat, deal.lng),
              map: this.map
            })
          }

          if (this.overlay) {
            this.overlay.setMap(null) // 기존 오버레이 제거
          }

          this.highPrice = formatToKoreanCurrency(high)
          this.lowPrice = formatToKoreanCurrency(low)

          const content = `
        <div class="overlay-info">
          <h4>${deal.name}</h4>
          <p>매매 가격: ${this.lowPrice} ~ ${this.highPrice}</p>
        </div>
      `

          this.overlay = new kakao.maps.CustomOverlay({
            map: this.map,
            position: new kakao.maps.LatLng(deal.lat, deal.lng),
            content: content,
            yAnchor: 1.5 // 마커 위에 표시하기 위해 조정
          })
        }
      } catch (e) {
        console.error('Error fetching apartment data:', e)
      }
    },

    async fetchDealsData() {
      try {
        console.log(this.searchKeyword)
        if (this.searchKeyword.trim() !== '') {
          // 각 함수의 결과를 개별적으로 받아옵니다.
          this.deals = await searchKeyword(this.searchKeyword)
          this.deals.reverse()
        }
      } catch (error) {
        console.error('Error fetching deals:', error)
      }
    },

    initMap() {
      const mapContainer = document.getElementById('map') // 지도를 표시할 div
      const mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3
      }

      this.map = new kakao.maps.Map(mapContainer, mapOption)

      kakao.maps.event.addListener(this.map, 'dragend', () => {
        this.updateMarkers()
      })

      // 확대/축소 이벤트 리스너
      kakao.maps.event.addListener(this.map, 'zoom_changed', () => {
        this.updateMarkers()
      })
    },

    searchPlace() {
      const keyword = document.getElementById('search-input').value
      if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!')
        return
      }

      const ps = new kakao.maps.services.Places()

      ps.keywordSearch(keyword, this.placesSearchCB)
    },

    placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        const firstPlace = data[0]

        this.map.setCenter(new kakao.maps.LatLng(firstPlace.y, firstPlace.x))

        if (this.marker) {
          this.marker.setPosition(new kakao.maps.LatLng(firstPlace.y, firstPlace.x))
        } else {
          this.marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(firstPlace.y, firstPlace.x),
            map: this.map
          })
        }
      } else {
        alert('검색 결과가 없습니다.')
      }
    }
  }
}
</script>
<style>
.overlay-info {
  background: white;
  border-radius: 6px;
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
.overlay-info h4 {
  margin: 0;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
  font-size: 16px;
}
.overlay-info p {
  margin: 5px 0 0;
  font-size: 14px;
}
</style>
<style scoped>
.search-results {
  height: 40vh;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
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
</style>
