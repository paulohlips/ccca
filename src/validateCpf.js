function validateCpf(cpf) {
    const isValid = checkIfIsValidCpf(cpf)
    if(!isValid) return false

    const cleanedCpf = removeSpecialCharacters(cpf)

    const allDigitsAreZero = checkIfAllDigitsAreEqual(cleanedCpf)
    if(allDigitsAreZero) return false

    try{
        let verificationNumber
        const [firstVerificationDigit, secondVerificationDigit] = calculateAllDigitsSum(cleanedCpf)

        const lastTwoDigits = cpf.substring(cpf.length-2, cpf.length)
        verificationNumber = [firstVerificationDigit, secondVerificationDigit].join("")
        return lastTwoDigits == verificationNumber

    }catch (e){
        console.error("Error on validate CPF: ", e)
        return false
    }
}

const checkIfIsValidCpf = (cpf) => {
    return (cpf === null || cpf === undefined || cpf.length !== 11)
}

const removeSpecialCharacters = (cpf) => {
    return cpf
    .replace('.','')
    .replace('.','')
    .replace('-','')
    .replace(" ","")
}

const checkIfAllDigitsAreEqual = (cleanedCpf)  => {
    return cleanedCpf.split("").every(c => c === cleanedCpf[0])
}

const calculateAllDigitsSum = (cleanedCpf) => {
    let allSumForFirstValidationDigit = 0, allSumForSecondValidationDigit = 0
    let secondVerificationDigit = 0
    let digit = 0
    let firstVerificationDigit = 0, divisionReminder = 0

    for (let index = 1; index < cleanedCpf.length -1; index++) {
        digit = Number(cleanedCpf[index -1])
        allSumForFirstValidationDigit += ( 11 - index ) * digit
        allSumForSecondValidationDigit += ( 12 - index ) * digit
    }

    divisionReminder = (allSumForFirstValidationDigit % 11)

    firstVerificationDigit = (divisionReminder < 2) ? firstVerificationDigit = 0 : 11 - divisionReminder
    allSumForSecondValidationDigit += 2 * firstVerificationDigit
    divisionReminder = (allSumForSecondValidationDigit % 11)

    secondVerificationDigit = (divisionReminder < 2) ? 0 : 11 - divisionReminder

    return [firstVerificationDigit, secondVerificationDigit]
}

module.exports = {
    validateCpf
}

