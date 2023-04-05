import { useRouter } from "next/router"
import { useEffect } from "react"

function Redirect({path}: {path: string}) {
    const { push } = useRouter();

    useEffect(() => {
    push(path);
  },[])
    return (
    <div>...</div>
  )
}

export default Redirect;
