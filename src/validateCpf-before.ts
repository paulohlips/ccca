export default function validateCpf(cpf: string): boolean {
    const isValid = checkIfIsValidCpf(cpf)
    if(!isValid) return false

    const cleanedCpf = removeSpecialCharacters(cpf)

    const allDigitsAreZero = checkIfAllDigitsAreZero(cleanedCpf)
    if(allDigitsAreZero) return false

    try{
        let verificationNumber:string
        const [firstVerificationDigit, secondVerificationDigit] = calculateAllDigitsSum(cleanedCpf)

        const lastTwoDigits = cpf.substring(cpf.length-2, cpf.length)
        verificationNumber = [firstVerificationDigit, secondVerificationDigit].join("")
        return lastTwoDigits == verificationNumber

    }catch (e){
        console.error("Error on validate CPF: ", e)
        return false
    }
}

const checkIfIsValidCpf = (cpf: string): boolean => {
    return (cpf === null || cpf === undefined || cpf.length !== 11)
}

const removeSpecialCharacters = (cpf: string): string => {
    return cpf
    .replace('.','')
    .replace('.','')
    .replace('-','')
    .replace(" ","")
}

const checkIfAllDigitsAreZero = (cleanedCpf: string): boolean  => {
    return cleanedCpf.split("").every(c => c === cleanedCpf[0])
}

const calculateAllDigitsSum = (cleanedCpf: string): [number, number] => {
    let allSumForFirstValidationDigit: number = 0, allSumForSecondValidationDigit: number = 0
    let secondVerificationDigit: number = 0
    let digit: number = 0
    let firstVerificationDigit: number = 0, divisionReminder: number = 0

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

