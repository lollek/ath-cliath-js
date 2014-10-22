from ath_cliath.Tile import Tile

class Map:

    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.map = [ Tile(True) for _ in range(width * height) ]

    def __getitem__(self, index):
        # Get Tile at position = (x, y)
        return self.map[index[0] + index[1] * self.width]

    def create_room(self, room):
       # Carve out a room (which needs to be a Rect)
       for x in range(room.x1, room.x2):
           for y in range(room.y1, room.y2):
               self.map[x + y * self.width].blocked = False
               self.map[x + y * self.width].block_sight = False


    def remove_fov(self):
        # Make all tiles in map non-visible

        for tile in self.map:
            tile.in_fov = False
