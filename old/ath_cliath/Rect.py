class Rect:
    def __init__(self, x, y, w, h):
        (self.x1, self.x2) = (x, x + w)
        (self.y1, self.y2) = (y, y + h)

    def center(self):
        # return the center of this rect
        center_x = (self.x1 + self.x2) / 2
        center_y = (self.y1 + self.y2) / 2
        return (center_x, center_y)

    def intersect(self, other):
        # returns true if this rectangle intersects with other
        return (self.x1 <= other.x2 and self.x2 >= other.x1 and
                self.y1 <= other.y2 and self.y2 >= other.y1)

