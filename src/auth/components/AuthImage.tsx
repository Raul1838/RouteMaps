import routeMapsAuthImage from "../../assets/routeMapsAuthImage.jpeg";

export const AuthImage = () => {
    return (
        <img
            src={routeMapsAuthImage}
            alt="RouteMaps welcome image | auth"
            style={{maxWidth: '90%', maxHeight: '100%', objectFit: 'contain'}}
        />
    )
}
