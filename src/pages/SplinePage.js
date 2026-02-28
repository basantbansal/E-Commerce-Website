// just a experiment to see if we can use spline in our app, not sure if we will keep it or not

import Spline from '@splinetool/react-spline';

function SplinePage() {
  return (
    <div className="h-screen" style={{ height: "100vh" }}>
      <Spline scene="https://prod.spline.design/URmdRi6hApPTd9l9/scene.splinecode" style={{ pointerEvents: "auto" }}/>

    </div>
  );
}

export default SplinePage;