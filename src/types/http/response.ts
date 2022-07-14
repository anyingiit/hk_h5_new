export interface Base {
  "code": number,
  "message": string
}

export interface Common extends Base {
  "data": object | {}[],
}

export interface Entity extends Common {
  "data": object
}

export interface List extends Common {
  "data": {}[]
}

