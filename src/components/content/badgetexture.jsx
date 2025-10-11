import { Text, Image } from "@react-three/drei";
export default function BadgeTexture({ user }) {
  return (
    <>
      <color attach="background" args={["#111"]} />

      {/* Name */}
      <Text
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
        position={[0, 0.5, 0]}
      >
        {user?.name || "YADHU GOPAKUMAR"}
      </Text>

      {/* Role */}
      <Text
        fontSize={0.2}
        color="#00ff00"
        anchorX="center"
        anchorY="middle"
        position={[0, 0.1, 0]}
      >
        MCA STUDENT
      </Text>

      {/* Image */}
      <Image
        url={user?.image || "/yadhu.jpg"}
        scale={[1, 0.6]}
        position={[0, -0.5, 0]}
      />
    </>
  );
}
