function minCost(numProjects, projectId, bid) {
    let total = 0;
  for(let i = 0; i < numProjects; i++){
      //obtenemos los indices
      let indices= [];
      projectId.forEach((p,indx)=>{
          if(p === i) indices.push(indx);
          else return -1;
      });
      //obtenemos las ofertas
      let offers = []
      indices.forEach((indice)=>{
        offers.push(bid[indice])
      })
      const minOffer = Math.min(...offers);
      total += minOffer
  }
  return total
}

console.log(minCost(3, [2,0,1,2],[8,7,6,9]))