export interface Pet {
    name: string,
    species: string,
    age: string,
    color: string,
    gender: string,
    size: string,
    estate: string,
    diseases: disease[],
    sterilized: string,
    image: string,
    monthyear:number,
    date: number,
  }

export interface PetWithDoc extends Pet {
    doc: string;
    imageBinary: string;
}

export interface disease {
  label: string,
  value: string
}

