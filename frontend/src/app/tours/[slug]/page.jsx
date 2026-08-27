import PackageGrid from "../../Components/PackageGrid";

export default function DestinationPage({ params }) {
  return (
    <PackageGrid
      type={"Tour"}
      state={params.state}
      heading={`Explore ${params.state}`}
    />
  );
}