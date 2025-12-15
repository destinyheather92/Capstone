export default function sortData(data,type){
 return data.toSorted((a, b) => {
      if (a[type] < b[type]) return -1;
      if (a[type] < b[type]) return 1;
      return 0;
    })
}