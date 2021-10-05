export interface Dog {
  id: string
  url: string
  title: string
  isAdopted?: boolean
}

export interface InitialState {
  adoptedList: Dog[] | null
  cart: Dog[] | null
  notAdoptedList: Dog[] | null
}

export interface Action {
  type: string
  payload: Payload
}

export interface Payload {
  id: string | null
  adoptedList: Dog[] | null
  dog: Dog | null
  cart: Dog[] | null
  notAdoptedList: Dog[] | null
}
