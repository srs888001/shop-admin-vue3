import * as xlsx from 'xlsx'

export const jsonToExcel = (options: {
  data: any[]
  header: Record<string, string>
  fileName: string
  bookType: xlsx.BookType
}) => {
  // 1、创建一个工作簿 workbook
  const wb = xlsx.utils.book_new()

  // 2、创建工作表 worksheet

  if (options.header) {
    options.data = options.data.map(item => {
      const obj: Record<string, any> = {}
      for (const key in item) {
        if (options.header[key]) {
          obj[options.header[key]] = item[key]
        } else {
          obj[key] = item[key]
        }
      }
      return obj
    })
  }

  const ws = xlsx.utils.json_to_sheet(options.data)

  // 3. 把工作表放到工作簿中
  xlsx.utils.book_append_sheet(wb, ws)

  // 4、生成数据保存
  xlsx.writeFile(wb, options.fileName, {
    bookType: options.bookType || 'xlsx'
  })
}

interface Action<T> {
  payload?: T;
  type: string;
}

interface initInterface {
  count: number;
  message: string;
  asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>;
  syncMethod<T, U>(action: Action<T>): Action<U>;
}

// type RemoveNonFunctionProps<T> = {
//   [K in keyof T]: T[K] extends Function ? K : never;
// }[keyof T];
// type FunctionProps = RemoveNonFunctionProps<initInterface>

// type PickFunction<T> = Pick<T, RemoveNonFunctionProps<T>>;
// type iFunctionInterface = PickFunction<initInterface>;

// type TransformMethod<T> = T extends (
//   input: Promise<infer U>
// ) => Promise<Action<infer S>>
//   ? (input: U) => Action<S>
//   : T extends (action: Action<infer U>) => Action<infer S>
//   ? (action: U) => Action<S>
//   : never;

// type asyncMethod<T, U> = (input: Promise<T>) => Promise<Action<U>>;
// type transformAsyncMethod<T, U> = (action: T) => Action<U>;
// type iFunctionInterface1 = TransformMethod<asyncMethod<T, U>>

type RemoveNonFunctionProps<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
type PickFunction<T> = Pick<T, RemoveNonFunctionProps<T>>;
type TransformMethod<T> = T extends (
  input: Promise<infer U>
) => Promise<Action<infer S>>
  ? (input: U) => Action<S>
  : T extends (action: Action<infer U>) => Action<infer S>
  ? (action: U) => Action<S>
  : never;

type ConnectAll<T> = {
  [K in keyof T]: TransformMethod<T[K]>;
};
type Connect<T> = ConnectAll<PickFunction<T>>
// interface Action<T> {
//   payload?: T;
//   type: string;
// }
// iFunctionInterface1.asyncMethod()
// 在经过 Connect 函数之后，返回值类型为
// type Result {
//   asyncMethod<T, U>(input: T): Action<U>;
//   syncMethod<T, U>(action: T): Action<U>;
// }
type iFunctionInterface1 = Connect<initInterface>
const bb: iFunctionInterface1 = {
  asyncMethod<T, U> (input: T): Action<U> {
    throw new Error('Function not implemented.')
  },
  syncMethod<T, U> (action: T): Action<U> {
    throw new Error('Function not implemented.')
  }
}
const aa = bb.asyncMethod('asdfasd')
aa.payload = 121231
// aa.type = ''
