package org.pgm.service;

import lombok.RequiredArgsConstructor;
import org.pgm.dto.NotificationDto;
import org.pgm.entity.Notification;
import org.pgm.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public NotificationDto createNotification(NotificationDto dto) {
        Notification entity = new Notification();
        entity.setMessage(dto.getMessage());

        Notification saved = notificationRepository.save(entity);

        dto.setId(saved.getId());
        return dto;
    }

    @Override
    public List<NotificationDto> getNotificationsByStore(Long storeId) {
        // storeId 기반 필터 제거 후 전체 반환
        return notificationRepository.findAll().stream()
                .map(n -> {
                    NotificationDto dto = new NotificationDto();
                    dto.setId(n.getId());
                    dto.setMessage(n.getMessage());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }
}
