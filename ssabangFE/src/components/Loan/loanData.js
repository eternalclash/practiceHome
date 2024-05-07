export default const loanData = {
    "보금자리론": {
      eligibilityCriteria: {
        legalAge: "민법상 성년",
        nationality: "대한민국 국민",
        creditScore: "CB점수 271점 이상",
        creditInfoManagement: "한국신용정보원 신용정보관리규약 해당사항 없고"
      },
      loanRequirements: {
        propertyValueLimit: "6억원 이하 공부상 주택",
        housingStatus: "본건 담보주택 제외 무주택 OR 1주택",
        income: "부부합산 연소득 7천만원 이하",
        financialRatios: {
          LTV: "최대 70%",
          DTI: "최대 60%"
        }
      },
      productStructure: {
        loanLimit: "대출한도 최대 3.6억원",
        maturityTerms: ["10년", "15년", "20년", "30년", "40년", "50년"],
        repaymentMethods: ["원리금 균등", "원금 균등", "체증식 분할상환"]
      }
    },
    "내집마련 디딤돌 대출": {
      eligibilityCriteria: {
        legalAge: "민법상 성년",
        nationality: "대한민국 국민",
        headOfHousehold: "접수일 현재 세대주",
        creditScore: "CB점수 350점 이상",
        assetValueLimit: "본인 및 배우자 합산 순자산 가액 4.69억원 이하"
      },
      loanRequirements: {
        propertyValueLimit: "5억원 이하 공부상 주택 (신혼 · 2자녀 이상 가구 6억원)",
        housingStatus: "세대원 전원이 무주택",
        income: "부부합산 연소득 60백만원 이하 (생애최초, 2자녀 이상 가구 70백만원, 신혼가구 85백만원)",
        financialRatios: {
          LTV: "최대 70%",
          DTI: "최대 60%"
        }
      },
      productStructure: {
        loanLimit: "대출한도 최대 2억 5천만원 (생애최초 주택구입자 3억원, 신혼 · 2자녀 이상 가구는 4억원)",
        maturityTerms: ["10년", "15년", "20년", "30년"],
        repaymentMethods: ["원리금 균등", "원금 균등", "체증식 분할상환"]
      },
      additionalInfo: "주택도시기금을 통해 무주택 서민에게 낮은 금리로 공급되는 상품입니다."
    }
  };
  


const data  = {
    "title" : "생애최초 보금자리론",
    
}


const 생애최초보금자리론 = {
    제목: "생애최초로 내집마련을 실현하는 고객에게 최대 대출 한도 LTV 80%까지 도움을 드리기 위한 상품"
    대상요건: "신청일 현재 부부 모두 무주택자에 본 건이 생애최초로 주택을 취득하는 자",
    자금용도: "구입용도로만 가능",
    LTV: "80%",
    한도: "4.2억원"
}

const 전세사기피해자