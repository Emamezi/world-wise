import { useSearchParams } from "react-router-dom";

function useUrlPosition() {
  const [searchParams] = useSearchParams();
  //get url state for selected city
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return [lat, lng];
}

export default useUrlPosition;
