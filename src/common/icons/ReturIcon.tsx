import React from 'react'

function ReturIcon({ className, fill }: { className?: string, fill?: string }) {
  return (
    <svg className={className} width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.71829 12.3178L0.218728 8.43434C0.0624934 8.30659 -4.28224e-07 8.1533 -4.09693e-07 8C-3.91162e-07 7.8467 0.0624934 7.69341 0.218728 7.56566L4.71829 3.68217C4.99951 3.45222 5.46822 3.42667 5.74944 3.68217C6.06191 3.91211 6.09316 4.29535 5.78069 4.55084L1.78108 8L5.78069 11.4492C6.09316 11.7047 6.06191 12.0879 5.74944 12.3178C5.46822 12.5733 4.99951 12.5478 4.71829 12.3178Z" fill={fill} />
      <path d="M8.71829 12.3178L4.21873 8.43434C4.06249 8.30659 4 8.1533 4 8C4 7.8467 4.06249 7.69341 4.21873 7.56566L8.71829 3.68217C8.99951 3.45222 9.46822 3.42667 9.74944 3.68217C10.0619 3.91211 10.0932 4.29535 9.78069 4.55084L5.78108 8L9.78069 11.4492C10.0932 11.7047 10.0619 12.0879 9.74944 12.3178C9.46822 12.5733 8.99951 12.5478 8.71829 12.3178Z" />
    </svg>
  )
}

export default ReturIcon
