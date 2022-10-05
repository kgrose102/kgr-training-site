<?php

namespace Drupal\fanshawe_course_interest\Plugin\Block;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Database\Connection;
use Drupal\Core\Form\FormBuilderInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\Core\Session\AccountInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;


/**
 * Provudes 'Course Interest Block' Block.
 * 
 * @Block(
 *      id = "course_interest_block",
 *      admin_label = @Translation("Course Interest Block"),
 *      category = @Translation("Fanshawe"),
 * )
 */

class CourseInterestBLock extends BlockBase implements ContainerFactoryPluginInterface{

    /**
    * A route matcher to get information about the current route.
    *
    * @var \Drupal\Core\Routing\CurrentRouteMatch
    */
    protected $currentRouteMatch;

    /**
    * Returns the current primary database.
    *
    * @var \Drupal\Core\Database\Connection
    */
    protected $databaseConnection;


    /**
    * {@inheritdoc}
    */
    public function __construct(
        array $configuration,
        $plugin_id,
        $plugin_definition,
        CurrentRouteMatch $current_route_match,
        Connection $database_connection,
        FormBuilderInterface $form_builder
      ) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->currentRouteMatch = $current_route_match;
        $this->databaseConnection = $database_connection;
        $this->formBuilder = $form_builder;
      }

    /**
   * {@inheritdoc}
    */
    public static function create(
        ContainerInterface $container,
        array $configuration,
        $plugin_id,
        $plugin_definition
      ) {
        return new static(
          $configuration,
          $plugin_id,
          $plugin_definition,
          $container->get('current_route_match'),
          $container->get('database'),
          $container->get('form_builder')
        );
      }    
    
    /**
    * {@inheritdoc}
    */
    public function build() {
        $build = [];
        $build['form'] = $this->formBuilder->getForm('Drupal\fanshawe_course_interest\Form\CourseInterestForm');
        return $build;
    }

    /**
    * {@inheritdoc}
    */
    protected function blockAccess(AccountInterface $account) {
        $node = $this->currentRouteMatch->getParameter('node');

        if (!empty($node)) {
            $query = $this->databaseConnection->select('fanshawe_course_interest_enabled', 'fcie');
            $query->addField('fcie', 'nid');
            $query->condition('fcie.nid', $node->id());
            $results = $query->execute()->fetchAll();

            if (empty($results)) {
                return AccessResult::forbidden();
            }
        }

        return AccessResult::allowedIfHasPermission($account, 'view fanshawe course interest form');
    }

}