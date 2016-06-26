class Tile:
    def __init__(self, blocked, block_sight = None):
        self.blocked = blocked
        self.explored = False
        self.in_fov = False
        self.block_sight = blocked if block_sight is None else block_sight
