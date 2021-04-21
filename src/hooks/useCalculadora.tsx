import { useRef, useState } from "react"

type Operadores = '+' | '-' | '*' | '/';

export const useCalculadora = () => {

  const [previousNumber, setPreviousNumber] = useState('0')
  const [baseNumber, setBaseNumber] = useState('0')

  const operationRef = useRef<Operadores>()

  const formatNumber = (number: string) => number.replace(/(\d)(?=(\d{3})+\b)/g, "$1.")

  const removePointsNumber = (number: string) => number.replace(/\./g, '')

  const clearScreen = () => {
    setBaseNumber('0')
    setPreviousNumber('0')
  }

  const setActionOnScreen = (actionText: string) => {

    if (baseNumber.includes(',') && actionText === ',') return

    if (baseNumber.startsWith('0') || baseNumber.startsWith('-0')) {

      /* Evaluate floating point */
      if (actionText === ',') {
        setBaseNumber(baseNumber + actionText)
        /* Evaluate if base includes floating point and input is 0 */
      } else if (actionText === '0' && baseNumber.includes(',')) {
        setBaseNumber(baseNumber + actionText)
        /* Evaluate if input is different of 0 and base number not includes a floating point */
      } else if (actionText !== '0' && !baseNumber.includes(',')) {
        setBaseNumber(actionText)
        /* Avoid 0000.0 */
      } else if (actionText === '0' && !baseNumber.includes(',')) {
        setBaseNumber(baseNumber)
      } else {
        setBaseNumber(baseNumber + actionText)
      }

    } else {

      if (baseNumber.includes(',')) {
        let numberSplit = baseNumber.split(',')
        let leftSideNumber = formatNumber(removePointsNumber(numberSplit[0]))
        let rightSideNumber = numberSplit[1] + actionText

        setBaseNumber(`${leftSideNumber},${rightSideNumber}`)
      } else {

        let divisionByZero = baseNumber === 'No se puede dividir entre 0'

        let numberWithoutCommas = divisionByZero ? '' : removePointsNumber(baseNumber)
        let concatNumber = `${numberWithoutCommas}${actionText}`
        let formatedNumber = formatNumber(concatNumber)

        setBaseNumber(formatedNumber)

      }

    }

  }

  const plusAndMinus = () => {

    if (baseNumber.includes('-')) {
      setBaseNumber(baseNumber.replace('-', ''))
    } else {
      setBaseNumber('-' + baseNumber)
    }

  }

  const delLastAction = () => {

    if (baseNumber.length === 1 || (baseNumber.length < 3 && baseNumber.includes('-'))) {

      if (operationRef.current !== undefined && baseNumber === '0') {
        setPreviousNumber(formatNumber(removePointsNumber(previousNumber.slice(0, -1))))
        operationRef.current = undefined
      } else {
        setBaseNumber('0')

        if (previousNumber === '0' || operationRef.current === undefined) {
          setPreviousNumber('0')
        }

      }

    } else {
      let numberWithoutPoints = removePointsNumber(baseNumber.slice(0, -1))
      setBaseNumber(formatNumber(numberWithoutPoints))
    }

  }

  const setHistoryResult = () => {

    if (baseNumber.endsWith('.')) {
      setPreviousNumber(`${baseNumber.slice(0, -1)} ${operationRef.current}`)
    } else if (operationRef.current !== undefined) {
      setPreviousNumber(`${baseNumber} ${operationRef.current}`)
    } else {

      if (previousNumber !== '0') {
        setPreviousNumber(`${previousNumber} ${operationRef.current}`)
      } else {
        setPreviousNumber(`${baseNumber} ${operationRef.current}`)
      }

    }

    setBaseNumber('0')
  }

  const setOperator = (operator: Operadores) => {
    operationRef.current = operator
    setHistoryResult()
  }

  const calculateResult = () => {

    if (baseNumber === 'No se puede dividir entre 0') {
      setBaseNumber('0')
      operationRef.current = undefined
      return
    }

    const firstNumberWithoutFormat = removePointsNumber(previousNumber.slice(0, -2))
    const secondNumberWithoutFormat = removePointsNumber(baseNumber)

    const firstNumber = Number(firstNumberWithoutFormat.replace(',', '.'))
    const secondNumber = Number(secondNumberWithoutFormat.replace(',', '.'))

    if (operationRef.current !== undefined) setPreviousNumber(`${previousNumber} ${`${baseNumber}`}`)

    switch (operationRef.current) {
      case '+':
        setBaseNumber(formatNumber(`${firstNumber + secondNumber}`.replace('.', ',')))
        break;
      case '-':
        setBaseNumber(formatNumber(`${firstNumber - secondNumber}`.replace('.', ',')))
        break;
      case '*':
        setBaseNumber(formatNumber(`${firstNumber * secondNumber}`.replace('.', ',')))
        break;
      case '/':
        if (secondNumber === 0) {
          setBaseNumber('No se puede dividir entre 0')
        } else {
          let result = firstNumber / secondNumber
          setBaseNumber(`${result}`.replace('.', ','))
        }
        break;
    }

    operationRef.current = undefined
  }

  return {
    previousNumber,
    baseNumber,
    clearScreen,
    setActionOnScreen,
    plusAndMinus,
    delLastAction,
    setOperator,
    calculateResult,
  }

}