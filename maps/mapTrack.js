export default function MapTrack(album, track) {
    return {
        album: album.album,
        album_number: album.album_number,
        artist: album.artist,
        cover: album.cover,
        thumbnail: album.thumbnail,
        genre: album.genre,
        id: track.id,
        number: track.track_number,
        title: track.title,
        url: track.url
    }
}