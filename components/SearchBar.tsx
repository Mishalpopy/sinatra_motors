"use client"
import SearchManufacture from "./SearchManufacture"
import { useState } from "react"
import Image from "next/image"
import React from "react"
import Router from "next/router"
import { useRouter } from "next/navigation"
import { manufacturer } from "@/constants"
const SearchButton = ( {otherClasses }: { otherClasses: string } ) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
        <Image
      src={"/magnifying-glass.svg"}
      alt={"magnifying glass"}
      width={40}
      height={40}
      className='object-contain'
    />
  </button>
)

const SearchBar = () => {
    const [manufacturers, setManufacturers] = useState('');
    const  [model, setModel] = useState('')
    const router = useRouter();
    const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (manufacturers.trim() === "" && model.trim() === "") {
              return alert("Please provide some input");
            }

              updateSearchParams(model.toLowerCase(), manufacturers.toLocaleLowerCase())

    }

    const updateSearchParams = (model: string, manufacture:string) => {
      const searchParams = new URLSearchParams(window.location.search);

      if(model) {
        searchParams.set('model', model)
      } else {
        searchParams.delete('model', )
      }

      if(manufacturers) {
        searchParams.set('manufacturers', model)
      } else {
        searchParams.delete('manufacturers', )
      }

      const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    
      router.push(newPathname);
    }
  return (
  <form className='searchbar' onSubmit={handleSearch}>
        <div className="searchbar__item">
            <SearchManufacture 
            manufacturers={manufacturers}
            setManufacturers={setManufacturers}
            />
            <SearchButton otherClasses="sm:hidden"/>
        </div>
        <div className="searchbar__item">
          <Image
          src="/model-icon.png"
          alt="model"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          />
          <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan"
          className="searchbar__input"
          />
          <SearchButton otherClasses="sm:hidden"/>
        </div>
        <SearchButton otherClasses="max-sm:hidden"/>

  </form>
  )
}

export default SearchBar