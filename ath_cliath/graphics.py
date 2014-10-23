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

def render_map_background(surface, map, storage=[]):

    # Lazy loading images. TODO: Implement a better system for storing images
    if not storage:
        dark_floor = pygame.image.load('img/lv1/ground_dark.png')
        light_floor = pygame.image.load('img/lv1/ground_light.png')
        dark_wall = pygame.image.load('img/lv1/wall_dark.png')
        light_wall = pygame.image.load('img/lv1/wall_light.png')
        storage = [dark_floor, light_floor, dark_wall, light_wall]
    else:
        dark_floor, light_floor, dark_wall, light_wall = storage

    for x in range(map.width):
        for y in range(map.height):
            if map[x, y].in_fov:
                surface.blit(light_wall if map[x,y].block_sight else
                             light_floor, (x * 10, y * 10))
                map[x,y].explored = True
            elif map[x, y].explored:
                surface.blit(dark_wall if map[x,y].block_sight else
                             dark_floor, (x * 10, y * 10))
