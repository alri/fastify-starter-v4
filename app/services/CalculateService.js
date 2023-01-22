class CalculateService {
    constructor({ CalculateRepository }) {
      this.CalculateRepository = CalculateRepository
    }

    sum(a,b){
        return (a+b)
    }

    double(a){
        return a * this.CalculateRepository.getNumber()
    }
  
    dispose() {
      // Disposal logic goes here
      // for awilix dipendency injection
    }
  }

  module.exports=CalculateService
