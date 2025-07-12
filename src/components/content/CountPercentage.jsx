import { useState, useEffect } from "react"

function PercentageElement({ value }) {
  return (
    <span>{value}%</span>
  )
}
function CountMembers({ value }) {
  return (
    <span>+{value}</span>
  )
}

export function IncomeTotal() {
  const [totalIncome, setTotalIncome] = useState(0)
  useEffect(() => {
    const fetchDataIncome = async () => {
      const response = await fetch('http://localhost:3111/books/stats')
      const statsData = await response.json()

      if (response.ok) {
        const income = statsData.income.weekly

        const incomeLatest = income.length - 1
        const latestIncome = income[incomeLatest]
        const total = latestIncome.value
        setTotalIncome(total)
      }
    }
    fetchDataIncome()
  })

  return (
    <span>{totalIncome}</span>
  )
}

export function LoanTotal() {
  const [totalLoan, setTotalLoan] = useState(0)
  useEffect(() => {
    const fetchDataLoan = async () => {
      const response = await fetch('http://localhost:3111/books/stats')
      const statsData = await response.json()

      if (response.ok) {
        const loan = statsData.loan.weekly

        const loanLatest = loan.length - 1
        const latestIncome = loan[loanLatest]
        const total = latestIncome.value
        setTotalLoan(total)
      }
    }
    fetchDataLoan()
  })

  return (
    <span>{totalLoan}</span>
  )
}

export function MembersTotal() {
  const [totalMembers, setTotalMembers] = useState(0)
  useEffect(() => {
    const fetchDataMembers = async () => {
      const response = await fetch('http://localhost:3111/books/stats')
      const statsData = await response.json()

      if (response.ok) {
        const members = statsData.members.weekly

        const membersLatest = members.length - 1
        const latestMembers = members[membersLatest]
        const total = latestMembers.value
        setTotalMembers(total)
      }
    }
    fetchDataMembers()
  })

  return (
    <span>{totalMembers}</span>
  )
}

export default function PercentageValue({ chartKe }) {
  const [percentationIncome, setPercentationIncome] = useState(0)
  const [percentationLoan, setPercentationLoan] = useState(0)
  const [percentationMembers, setPercentationMembers] = useState(0)

  useEffect(() => {
    const fetchDataIncome = async () => {
      const response = await fetch('http://localhost:3111/books/stats')
      const statsData = await response.json()

      if (response.ok) {
        const income = statsData.income.weekly

        const incomeLatest = income.length - 1
        const incomePrevious = income.length - 2
        const latestIncome = income[incomeLatest]
        const latestIncomeValue = latestIncome.value
        const previousIncome = income[incomePrevious]
        const previousIncomeValue = previousIncome.value
        const calculatePercent = latestIncomeValue - previousIncomeValue
        const finalResult = (calculatePercent / previousIncomeValue) * 100
        const percentage = finalResult.toFixed(2)

        setPercentationIncome(percentage)
      }
    }
    fetchDataIncome()


    const fetchDataLoan = async () => {
      const response = await fetch('http://localhost:3111/books/stats')
      const statsData = await response.json()

      if (response.ok) {
        const loan = statsData.loan.weekly

        const loanLatest = loan.length - 1
        const loanPrevious = loan.length - 2
        const latestLoan = loan[loanLatest]
        const latestLoanValue = latestLoan.value
        const previousLoan = loan[loanPrevious]
        const previousLoanValue = previousLoan.value
        const calculatePercent = latestLoanValue - previousLoanValue
        const finalResult = (calculatePercent / previousLoanValue) * 100
        const percentage = finalResult.toFixed(2)

        setPercentationLoan(percentage)
      }
    }
    fetchDataLoan()


    const fetchDataMembers = async () => {
      const response = await fetch('http://localhost:3111/books/stats')
      const statsData = await response.json()

      if (response.ok) {
        const members = statsData.members.weekly

        const membersLatest = members.length - 1
        const membersPrevious = members.length - 2
        const latestMembers = members[membersLatest]
        const latestMembersValue = latestMembers.value
        const previousMembers = members[membersPrevious]
        const previousMembersValue = previousMembers.value
        const total = latestMembersValue - previousMembersValue

        setPercentationMembers(total)
      }
    }
    fetchDataMembers()
  }, [])

  if (chartKe == 1) {
    return <PercentageElement value={percentationIncome} />
  } else if (chartKe == 2) {
    return <PercentageElement value={percentationLoan} />
  } else if (chartKe == 3) {
    return <CountMembers value={percentationMembers} />
  } else {
    alert("error!")
  }
}