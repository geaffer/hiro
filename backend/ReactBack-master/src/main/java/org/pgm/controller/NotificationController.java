package org.pgm.controller;

import lombok.RequiredArgsConstructor;

import org.pgm.dto.NotificationDto;
import org.springframework.web.bind.annotation.*;
import org.pgm.service.NotificationService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping
    public NotificationDto create(@RequestBody NotificationDto dto) {
        return notificationService.createNotification(dto);
    }

    @GetMapping("/{storeId}")
    public List<NotificationDto> getByStore(@PathVariable Long storeId) {
        return notificationService.getNotificationsByStore(storeId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        notificationService.deleteNotification(id);
    }
}
