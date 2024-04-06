export const calcSize = (nonogramWidth: number, nonogramHeght: number) => {
  let size
  if (nonogramWidth > nonogramHeght) size = nonogramWidth
  else size = nonogramHeght

if (size <= 5) return 20
if (size <= 10) return 10
if (size <= 20) return 8
if (size <= 30) return 4
if (size <= 40) return 2
if (size <= 50) return 4
if (size <= 60) return 0.5
return 0
}