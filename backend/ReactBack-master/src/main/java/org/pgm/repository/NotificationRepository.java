package org.pgm.repository;

import org.pgm.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    // Notification 엔티티에 대한 CRUD 작업을 기본적으로 지원합니다.
}
