import math

import pygame

def render_field_of_view(map, player, fov_range):
    map.remove_fov()

    min_x = player.x -fov_range -1
    max_x = player.x +fov_range
    if min_x < 0: min_x = 0
    if max_x > map.width: max_x = map.width

    min_y = player.y -fov_range -1
    max_y = player.y +fov_range
    if min_y < 0: min_y = 0
    if max_y > map.height: max_y = map.height

    fields = [(x,y) for x in range(min_x, max_x)
                    for y in range(min_y, max_y)
                    if x == min_x or x == max_x -1
                    or y == min_y or y == max_y -1]

    for x, y in fields:
        distance = math.sqrt((x -player.x) ** 2 + (y - player.y) ** 2)
        dx = (x -player.x) / distance
        dy = (y -player.y) / distance

        for r in range(fov_range):
            x1 = int(player.x +dx*r +0.5)
            y1 = int(player.y +dy*r + 0.5)
            map[x1, y1].in_fov = True
            if map[x1, y1].block_sight:
                break

def load_image(image_name, _storage={}):
    # Lazy loading images. TODO: Implement a better system for storing images
    if not _storage:
        _storage["dark_floor"] = pygame.image.load('img/lv1/ground_dark.png')
        _storage["light_floor"] = pygame.image.load('img/lv1/ground_light.png')
        _storage["dark_wall"] = pygame.image.load('img/lv1/wall_dark.png')
        _storage["light_wall"] = pygame.image.load('img/lv1/wall_light.png')
    return _storage[image_name]

def render_map_background(surface, map):
    # Draw the whole map background to a surface
    for x in range(map.width):
        for y in range(map.height):
            render_map_tile(surface, map[x, y], x, y)

def render_map_tile(surface, tile, x, y):
    # Draw a tile to a surface
    if tile.in_fov:
        surface.blit(load_image("light_wall") if tile.block_sight else
                     load_image("light_floor"), (x * 10, y * 10))
    elif tile.explored:
        surface.blit(load_image("dark_wall") if tile.block_sight else
                     load_image("dark_floor"), (x * 10, y * 10))
