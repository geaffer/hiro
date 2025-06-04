package org.pgm.service;

import java.util.List;

import org.pgm.dto.NotificationDto;

public interface NotificationService {
    NotificationDto createNotification(NotificationDto dto);
    List<NotificationDto> getNotificationsByStore(Long storeId);
    void deleteNotification(Long id);
}
