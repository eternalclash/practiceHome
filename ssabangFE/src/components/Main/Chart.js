import { defineComponent, h } from 'vue'

import { GChart } from 'vue-google-charts'

export const type = 'LineChart'

export const data = [
  ['Month', 'Sales'],
  ['2004-01', 100],
  ['2004-02', 120],
  ['2004-03', 130],
  // 연속해서 모든 월을 추가...
  ['2004-12', 110],
  ['2005-01', 115],
  ['2005-02', 125],
  // 반복...
  ['2007-12', 130]
]

export const options = {
  title: '실거래가(단위:만원)',
  curveType: 'function',
  legend: { position: 'bottom' },
  hAxis: {
    slantedText: true, // 긴 라벨의 경우 기울여서 보이기
    slantedTextAngle: 45, // 라벨 각도 조정
    ticks: [
      { v: '2004', f: '2004' },
      { v: '2005', f: '2005' },
      { v: '2006', f: '2006' },
      { v: '2007', f: '2007' }
    ] // 직접 눈금 지정
  }
}

export default defineComponent({
  name: 'GoogleChart',
  components: {
    GChart
  },
  setup() {
    return () =>
      h(GChart, {
        data,
        options,
        type
      })
  }
})
