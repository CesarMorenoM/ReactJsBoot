
const Loader = () => {
  return <div>
    <svg xmlns="http://www.w3.org/2000/svg" style={{ 'margin': 'auto', 'background': 'transparent', 'display': 'block' }} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <rect x="17.5" y="30" width="15" height="40" fill="#ff3229">
        <animate attributeName="y" repeatCount="indefinite" dur="0.9090909090909091s" calcMode="spline" keyTimes="0;0.5;1" values="18;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.18181818181818182s"></animate>
        <animate attributeName="height" repeatCount="indefinite" dur="0.9090909090909091s" calcMode="spline" keyTimes="0;0.5;1" values="64;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.18181818181818182s"></animate>
      </rect>
      <rect x="42.5" y="30" width="15" height="40" fill="#ff3229">
        <animate attributeName="y" repeatCount="indefinite" dur="0.9090909090909091s" calcMode="spline" keyTimes="0;0.5;1" values="20.999999999999996;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.09090909090909091s"></animate>
        <animate attributeName="height" repeatCount="indefinite" dur="0.9090909090909091s" calcMode="spline" keyTimes="0;0.5;1" values="58.00000000000001;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.09090909090909091s"></animate>
      </rect>
      <rect x="67.5" y="30" width="15" height="40" fill="#ff3229">
        <animate attributeName="y" repeatCount="indefinite" dur="0.9090909090909091s" calcMode="spline" keyTimes="0;0.5;1" values="20.999999999999996;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"></animate>
        <animate attributeName="height" repeatCount="indefinite" dur="0.9090909090909091s" calcMode="spline" keyTimes="0;0.5;1" values="58.00000000000001;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"></animate>
      </rect></svg>
  </div>
}

export default Loader