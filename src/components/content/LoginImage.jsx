import Image from "../../assets/image/3d-rendering-optical-illusion.png"

export default function LoginImage(){
  return (
    <div className="hidden relative w-full md:w-2/5 min-h-full md:flex items-center justify-start p-5">
      <img src={Image} className="w-4/5 h-auto object-cover" alt="" />
    </div>
  )
}